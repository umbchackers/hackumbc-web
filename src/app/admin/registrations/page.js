"use client";

/**
 * Internal registration analytics UI (/admin/registrations).
 * Auth is cookie-based via /api/admin/auth; chart windowing lives in
 * @/lib/admin/chart-range so day boundaries stay consistent with the API.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  RANGE_PRESETS,
  formatShort,
  formatTime,
  sliceHistory,
  toDateInputValue,
} from "@/lib/admin/chart-range";
import "../../css/admin.css";

/** Include session cookie on all admin API calls. */
const fetchOpts = { credentials: "include" };

function MetricCard({ label, value, hint }) {
  return (
    <div className="metric-card">
      <div className="label">{label}</div>
      <div className="value">{value ?? "—"}</div>
      {hint ? <div className="hint">{hint}</div> : null}
    </div>
  );
}

function LoginGate({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Incorrect password");
        return;
      }
      setPassword("");
      onSuccess();
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h1>Registration analytics</h1>
        <p>Organizers only. Enter the dashboard password.</p>
        {error ? <p className="admin-login-error">{error}</p> : null}
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="admin-btn" type="submit" disabled={loading}>
          {loading ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function RegistrationChart({ history, rangeId }) {
  const data = history.map((point) => ({
    ...point,
    label: formatShort(point.timestamp, rangeId),
  }));

  if (!data.length) {
    return (
      <p className="admin-empty">
        No snapshots in this range. Try All time, or wait for more snapshots to
        be recorded.
      </p>
    );
  }

  return (
    <div className="admin-chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid stroke="#2a3038" strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#8b939e", fontSize: 11 }}
            minTickGap={40}
          />
          <YAxis
            tick={{ fill: "#8b939e", fontSize: 11 }}
            allowDecimals={false}
            width={48}
            domain={["dataMin", "dataMax"]}
          />
          <Tooltip
            contentStyle={{
              background: "#12151a",
              border: "1px solid #2a3038",
              borderRadius: 6,
              color: "#e6e8eb",
              fontSize: 12,
            }}
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.timestamp
                ? formatTime(payload[0].payload.timestamp)
                : ""
            }
            formatter={(value) => [value, "Registrations"]}
          />
          <Line
            type="monotone"
            dataKey="totalRegistrations"
            stroke="#6ea8fe"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#6ea8fe" }}
            isAnimationActive
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const TSHIRT_ORDER = ["small", "medium", "large", "xl", "xxl"];

function formatTallyLabel(label) {
  if (!label) return "Unknown";
  if (label === "None" || label === "Unknown") return label;
  return label
    .split(/[\s_-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function sortTshirtRows(rows) {
  return [...rows].sort((a, b) => {
    const ai = TSHIRT_ORDER.indexOf(String(a.label).toLowerCase());
    const bi = TSHIRT_ORDER.indexOf(String(b.label).toLowerCase());
    const aRank = ai === -1 ? TSHIRT_ORDER.length : ai;
    const bRank = bi === -1 ? TSHIRT_ORDER.length : bi;
    if (aRank !== bRank) return aRank - bRank;
    return String(a.label).localeCompare(String(b.label));
  });
}

function TallyTable({ title, rows, emptyLabel, footerLabel }) {
  if (!rows?.length) {
    return (
      <div className="tally-block">
        <h3>{title}</h3>
        <p className="admin-empty tally-empty">{emptyLabel}</p>
      </div>
    );
  }

  const total = rows.reduce((sum, row) => sum + row.count, 0);

  return (
    <div className="tally-block">
      <h3>{title}</h3>
      <table className="tally-table">
        <thead>
          <tr>
            <th scope="col">Option</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td>{formatTallyLabel(row.label)}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
        {footerLabel ? (
          <tfoot>
            <tr>
              <td>{footerLabel}</td>
              <td>{total}</td>
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}

function EventPrepPanel({ onLogout }) {
  const [tallies, setTallies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadTallies() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/tallies", fetchOpts);
      if (res.status === 401) {
        onLogout();
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || data.error || "Failed to load tallies");
      }
      setTallies(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const shirtRows = tallies ? sortTshirtRows(tallies.tshirtSizes || []) : [];

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <h2>Event prep tallies</h2>
          <p className="panel-sub">
            T-shirt sizes & dietary restrictions · load only when you ask
          </p>
        </div>
        <button
          className="admin-btn primary"
          type="button"
          onClick={loadTallies}
          disabled={loading}
        >
          {loading ? "Scanning…" : tallies ? "Recalculate" : "Load tallies"}
        </button>
      </div>

      {error ? <div className="admin-error">{error}</div> : null}

      {!tallies && !loading && !error ? (
        <p className="admin-empty">
          Press <strong>Load tallies</strong> to scan registrations for
          t-shirt and dietary counts. This is not refreshed automatically.
        </p>
      ) : null}

      {loading && !tallies ? (
        <p className="admin-empty">Scanning registrations table…</p>
      ) : null}

      {tallies ? (
        <>
          <p className="range-summary">
            Scanned <strong>{tallies.scanned}</strong> registrations
            {tallies.generatedAt ? (
              <>
                {" "}
                · As of <strong>{formatTime(tallies.generatedAt)}</strong>
              </>
            ) : null}
          </p>
          <div className="tally-grid">
            <TallyTable
              title="T-shirt sizes"
              rows={shirtRows}
              emptyLabel="No t-shirt sizes found."
            />
            <TallyTable
              title="Dietary restrictions"
              rows={tallies.dietaryRestrictions}
              emptyLabel="No dietary restrictions found."
              footerLabel="Total selections"
            />
          </div>
        </>
      ) : null}
    </section>
  );
}

function Dashboard({ onLogout }) {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rangeId, setRangeId] = useState("all");
  const [selectedDate, setSelectedDate] = useState(toDateInputValue());

  const load = useCallback(async () => {
    setError("");
    try {
      const metricsRes = await fetch("/api/admin/metrics", fetchOpts);

      if (metricsRes.status === 401) {
        onLogout();
        return;
      }

      const metricsData = await metricsRes.json();

      if (!metricsRes.ok) {
        throw new Error(
          metricsData.detail || metricsData.error || "Failed to load metrics",
        );
      }

      setStats(metricsData.stats);
      setHistory(metricsData.history || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  // Poll while the dashboard is open (also triggers server-side snapshots)
  useEffect(() => {
    load();
    const id = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [load]);

  const sliced = useMemo(
    () => sliceHistory(history, rangeId, selectedDate),
    [history, rangeId, selectedDate],
  );

  const needsDate = rangeId === "day" || rangeId === "week";

  const growthLabel =
    stats?.growth === null || stats?.growth === undefined
      ? "—"
      : `${stats.growth > 0 ? "+" : ""}${stats.growth}%`;

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">Loading registration data…</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <h1>Registration analytics</h1>
            <p>Internal · DynamoDB snapshots</p>
          </div>
          <div className="admin-header-actions">
            <button className="admin-btn secondary" type="button" onClick={load}>
              Refresh
            </button>
            <button className="admin-logout" type="button" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </header>

        {error ? <div className="admin-error">{error}</div> : null}
        {stats?.warning ? (
          <div className="admin-error" role="status">
            {stats.warning}
          </div>
        ) : null}

        <section className="admin-metrics">
          <MetricCard
            label="Total Registrations"
            value={stats?.totalRegistrations}
          />
          <MetricCard
            label="Today"
            value={stats?.today}
            hint="Since Eastern midnight"
          />
          <MetricCard
            label="Yesterday"
            value={stats?.yesterday}
            hint="Eastern midnight window"
          />
          <MetricCard
            label="Growth"
            value={growthLabel}
            hint="Today vs yesterday signups"
          />
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Growth</h2>
              <p className="panel-sub">
                Snapshot history · updated about every 5 minutes
              </p>
            </div>
            <div className="range-controls">
              <div className="range-pills">
                {RANGE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`range-pill${rangeId === preset.id ? " active" : ""}`}
                    onClick={() => setRangeId(preset.id)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              {needsDate ? (
                <input
                  className="range-date"
                  type="date"
                  value={selectedDate}
                  max={toDateInputValue()}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  aria-label={
                    rangeId === "week" ? "Week ending on" : "Select day"
                  }
                />
              ) : null}
            </div>
          </div>

          <p className="range-summary">
            Showing <strong>{sliced.spanLabel}</strong>
            {sliced.newInRange !== null ? (
              <>
                {" "}
                · New in range:{" "}
                <strong>
                  {sliced.newInRange > 0 ? "+" : ""}
                  {sliced.newInRange}
                </strong>
              </>
            ) : null}
          </p>

          <RegistrationChart history={sliced.points} rangeId={rangeId} />
        </section>

        <EventPrepPanel onLogout={onLogout} />
      </div>
    </div>
  );
}

export default function AdminRegistrationsPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  // Restore session from HttpOnly cookie (no password in sessionStorage)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/auth", fetchOpts);
        if (!cancelled && res.ok) setAuthed(true);
      } catch {
        // stay logged out
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE", credentials: "include" });
    } catch {
      // still clear local auth state
    }
    setAuthed(false);
  }

  if (!ready) {
    return (
      <div className="admin-page">
        <div className="admin-loading">Loading…</div>
      </div>
    );
  }

  if (!authed) {
    return <LoginGate onSuccess={() => setAuthed(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
