"use client";

/**
 * Internal venue presence analytics (/admin/venue).
 * Auth: same HttpOnly admin session cookie as /admin/registrations.
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import "../../css/admin.css";

const fetchOpts = { credentials: "include" };
const POLL_MS = 30 * 1000;

function MetricCard({ label, value, hint }) {
  return (
    <div className="metric-card">
      <div className="label">{label}</div>
      <div className="value">{value ?? "—"}</div>
      {hint ? <div className="hint">{hint}</div> : null}
    </div>
  );
}

function formatScanTime(iso) {
  if (!iso) return "—";
  const raw = String(iso).trim();
  const asNum = Number(raw);
  const d =
    /^\d+$/.test(raw) && Number.isFinite(asNum)
      ? new Date(asNum < 1e12 ? asNum * 1000 : asNum)
      : new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function StatusBadge({ status }) {
  const isIn = status === "IN";
  return (
    <span className={`venue-badge ${isIn ? "in" : "out"}`}>
      {isIn ? "IN" : "OUT"}
    </span>
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
        <h1>Venue presence</h1>
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

function ActivityFeed({ rows }) {
  if (!rows?.length) {
    return (
      <p className="admin-empty">
        No venue scans yet. Activity appears once lastVenueScanAt is set.
      </p>
    );
  }

  return (
    <ul className="venue-feed">
      {rows.map((row, index) => (
        <li
          key={`${row.email || "unknown"}-${row.timestamp || "t"}-${index}`}
          className="venue-feed-item"
        >
          <time dateTime={row.timestamp}>{formatScanTime(row.timestamp)}</time>
          <StatusBadge status={row.status} />
          <div className="venue-feed-body">
            <strong>{row.name || "Participant"}</strong>
            <span>
              scanned {row.status === "IN" ? "IN" : "OUT"} by{" "}
              {row.operator || "—"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function MinorsTable({ title, rows, emptyLabel, scannedAtLabel }) {
  return (
    <div className="tally-block">
      <h3>
        {title} ({rows?.length ?? 0})
      </h3>
      {!rows?.length ? (
        <p className="admin-empty tally-empty">{emptyLabel}</p>
      ) : (
        <div className="venue-table-wrap">
          <table className="tally-table venue-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>{scannedAtLabel}</th>
                <th>Scanned by</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={`${row.email || "unknown"}-${row.lastScannedAt || "none"}-${index}`}
                >
                  <td>{row.name || "—"}</td>
                  <td>{row.email || "—"}</td>
                  <td>{row.age ?? "—"}</td>
                  <td>{formatScanTime(row.lastScannedAt)}</td>
                  <td>{row.scannedBy || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/venue", fetchOpts);

      if (res.status === 401) {
        onLogout();
        return;
      }

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(
          payload.detail || payload.error || "Failed to load venue analytics",
        );
      }

      setData(payload);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [load]);

  if (loading && !data) {
    return (
      <div className="admin-page">
        <div className="admin-loading">Loading venue presence…</div>
      </div>
    );
  }

  const summary = data?.summary;

  return (
    <div className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <h1>Venue presence</h1>
            <p>
              Internal · PWA user scans
              {data?.generatedAt
                ? ` · updated ${formatScanTime(data.generatedAt)}`
                : ""}
            </p>
          </div>
          <div className="admin-header-actions">
            <Link className="admin-btn secondary" href="/admin/registrations">
              Registrations
            </Link>
            <button className="admin-btn secondary" type="button" onClick={load}>
              Refresh
            </button>
            <button className="admin-logout" type="button" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </header>

        {error ? <div className="admin-error">{error}</div> : null}

        <section className="admin-metrics">
          <MetricCard
            label="Inside venue"
            value={summary?.currentlyInside}
            hint="venueStatus = IN"
          />
          <MetricCard
            label="Outside venue"
            value={summary?.currentlyOutside}
            hint="venueStatus = OUT"
          />
          <MetricCard
            label="Total PWA users"
            value={summary?.totalUsers}
            hint="All METADATA profiles"
          />
          <MetricCard
            label="Turnout"
            value={summary?.occupancyRate}
            hint="Checked in ÷ PWA users"
          />
        </section>

        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Live gate activity</h2>
              <p className="panel-sub">
                30 most recent lastVenueScanAt values, newest first.
                Auto-refreshes every 30s.
              </p>
            </div>
          </div>
          <ActivityFeed rows={data?.recentActivity} />
        </section>

        <section className="admin-panel venue-minors-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Minor safety watchlist</h2>
              <p className="panel-sub">
                Organizers only ·{" "}
                {data?.minorsInside?.length ?? 0} inside ·{" "}
                {data?.minorsOutside?.length ?? 0} outside
              </p>
            </div>
          </div>
          <div className="venue-minors-grid">
            <MinorsTable
              title="Inside"
              rows={data?.minorsInside}
              emptyLabel="No minors currently marked inside the venue."
              scannedAtLabel="Entered at"
            />
            <MinorsTable
              title="Outside"
              rows={data?.minorsOutside}
              emptyLabel="No minors currently marked outside the venue."
              scannedAtLabel="Exited at"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default function AdminVenuePage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

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
      await fetch("/api/admin/auth", {
        method: "DELETE",
        credentials: "include",
      });
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
