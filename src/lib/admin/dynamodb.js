/**
 * DynamoDB access for registration analytics.
 *
 * - REGISTRATIONS_TABLE: live signup records (read-only; never modified here)
 * - METRICS_TABLE: time-series snapshots { timestamp, totalRegistrations }
 * - PWA_TABLE: venue presence / check-in metadata (read-only here)
 *
 * Tables must already exist in AWS (no runtime CreateTable).
 */

import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";

const region = process.env.HACKUMBC_AWS_REGION;
const credentials = {
  accessKeyId: process.env.HACKUMBC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.HACKUMBC_AWS_SECRET_ACCESS_KEY,
};

export const dynamodb = new DynamoDBClient({ region, credentials });

export const REGISTRATIONS_TABLE =
  process.env.HACKUMBC_AWS_TABLE_NAME || "hackumbc_registration_2026";
export const METRICS_TABLE =
  process.env.HACKUMBC_AWS_METRICS_TABLE_NAME || "RegistrationMetrics";
export const PWA_TABLE =
  process.env.HACKUMBC_AWS_PWA_TABLE_NAME || "PWA-2026-Users";

function dynamoBool(attr) {
  if (!attr) return false;
  if (attr.BOOL === true) return true;
  if (attr.BOOL === false) return false;
  const raw = String(attr.S ?? attr.N ?? "")
    .trim()
    .toLowerCase();
  return raw === "true" || raw === "1" || raw === "yes";
}

function missingTableError(err) {
  if (err?.name === "ResourceNotFoundException") {
    return new Error(
      `DynamoDB table "${METRICS_TABLE}" was not found. Create it in AWS with partition key "timestamp" (String), then retry.`,
    );
  }
  return err;
}

/** Full-table COUNT of registrations (fine at hackathon scale). */
export async function getRegistrationCount() {
  let count = 0;
  let ExclusiveStartKey;

  do {
    const result = await dynamodb.send(
      new ScanCommand({
        TableName: REGISTRATIONS_TABLE,
        Select: "COUNT",
        ExclusiveStartKey,
      }),
    );
    count += result.Count || 0;
    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  return count;
}

export async function saveMetricSnapshot(
  totalRegistrations,
  timestamp = new Date().toISOString(),
) {
  try {
    await dynamodb.send(
      new PutItemCommand({
        TableName: METRICS_TABLE,
        Item: {
          timestamp: { S: timestamp },
          totalRegistrations: { N: String(totalRegistrations) },
        },
      }),
    );
  } catch (err) {
    throw missingTableError(err);
  }
  return { timestamp, totalRegistrations };
}

/** All metric rows, oldest → newest. */
export async function getMetricSnapshots() {
  const items = [];
  let ExclusiveStartKey;

  try {
    do {
      const result = await dynamodb.send(
        new ScanCommand({
          TableName: METRICS_TABLE,
          ExclusiveStartKey,
        }),
      );
      for (const item of result.Items || []) {
        items.push({
          timestamp: item.timestamp.S,
          totalRegistrations: Number(item.totalRegistrations.N),
        });
      }
      ExclusiveStartKey = result.LastEvaluatedKey;
    } while (ExclusiveStartKey);
  } catch (err) {
    throw missingTableError(err);
  }

  return items.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}

export async function getLatestMetricSnapshot() {
  // Simple approach: reuse full history (table stays small for a 2-month season)
  const snapshots = await getMetricSnapshots();
  return snapshots.length ? snapshots[snapshots.length - 1] : null;
}

function bump(map, key) {
  const label = key || "Unknown";
  map[label] = (map[label] || 0) + 1;
}

/**
 * On-demand tallies of t-shirt sizes and dietary restrictions from the
 * registrations table. Dietary values may be comma-separated lists.
 * Returns sorted { label, count } arrays — not polled automatically.
 */
export async function getEventPrepTallies() {
  const tshirtCounts = {};
  const dietaryCounts = {};
  let scanned = 0;
  let ExclusiveStartKey;

  do {
    const result = await dynamodb.send(
      new ScanCommand({
        TableName: REGISTRATIONS_TABLE,
        ProjectionExpression: "tshirtSize, dietaryRestrictions",
        ExclusiveStartKey,
      }),
    );

    for (const item of result.Items || []) {
      scanned += 1;
      bump(tshirtCounts, item.tshirtSize?.S?.trim());

      const raw = item.dietaryRestrictions?.S?.trim() || "";
      if (!raw || /^none$/i.test(raw)) continue;

      const parts = raw
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part && !/^none$/i.test(part));

      for (const part of parts) {
        bump(dietaryCounts, part);
      }
    }

    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);

  const toSortedList = (map) =>
    Object.entries(map)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  return {
    scanned,
    tshirtSizes: toSortedList(tshirtCounts),
    dietaryRestrictions: toSortedList(dietaryCounts),
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Write a new snapshot only if the latest is older than `minIntervalMs`
 * (default 5 minutes). Used by the dashboard and EventBridge cron.
 */
export async function maybeTakeSnapshot(minIntervalMs = 5 * 60 * 1000) {
  const latest = await getLatestMetricSnapshot();
  const now = Date.now();

  if (latest) {
    const age = now - new Date(latest.timestamp).getTime();
    if (age < minIntervalMs) {
      return { skipped: true, latest };
    }
  }

  const total = await getRegistrationCount();
  const snapshot = await saveMetricSnapshot(total);
  return { skipped: false, snapshot };
}

/**
 * Venue presence analytics from PWA METADATA rows.
 * Counts total users and desk check-ins only.
 */
export async function getVenueAnalytics() {
  let totalUsers = 0;
  let totalCheckedIn = 0;
  let ExclusiveStartKey;

  try {
    do {
      const result = await dynamodb.send(
        new ScanCommand({
          TableName: PWA_TABLE,
          ProjectionExpression: "checkedIn, sk",
          FilterExpression: "sk = :sk",
          ExpressionAttributeValues: {
            ":sk": { S: "METADATA" },
          },
          ExclusiveStartKey,
        }),
      );

      for (const item of result.Items || []) {
        totalUsers += 1;
        if (dynamoBool(item.checkedIn)) totalCheckedIn += 1;
      }

      ExclusiveStartKey = result.LastEvaluatedKey;
    } while (ExclusiveStartKey);
  } catch (err) {
    if (err?.name === "ResourceNotFoundException") {
      throw new Error(
        `DynamoDB table "${PWA_TABLE}" was not found. Confirm HACKUMBC_AWS_PWA_TABLE_NAME and retry.`,
      );
    }
    throw err;
  }

  const occupancyRate =
    totalUsers > 0
      ? `${((totalCheckedIn / totalUsers) * 100).toFixed(1)}%`
      : "0%";

  return {
    summary: {
      totalUsers,
      totalCheckedIn,
      occupancyRate,
    },
    generatedAt: new Date().toISOString(),
  };
}

function dynamoMapEntries(attr) {
  if (!attr?.M || typeof attr.M !== "object") return [];
  return Object.entries(attr.M);
}

function dynamoMapValueCount(attr) {
  if (!attr) return 0;
  if (attr.BOOL === true) return 1;
  if (attr.BOOL === false) return 0;
  if (attr.N !== undefined) {
    const n = Number(attr.N);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }
  if (attr.S !== undefined) {
    const raw = String(attr.S).trim().toLowerCase();
    if (raw === "true" || raw === "1" || raw === "yes") return 1;
    if (raw === "false" || raw === "0" || raw === "no" || raw === "") return 0;
    // Non-empty string (e.g. an event id / timestamp) counts as one attendance
    return 1;
  }
  // Nested map from PWA event scans: { attended, claimed, count, scanned, ... }
  if (attr.M && typeof attr.M === "object") {
    const nested = attr.M;
    for (const key of [
      "count",
      "attended",
      "claimed",
      "scanned",
      "redeemed",
      "value",
    ]) {
      if (nested[key] !== undefined) {
        return dynamoMapValueCount(nested[key]);
      }
    }
    // Any nested true/positive value counts as attendance
    for (const value of Object.values(nested)) {
      const n = dynamoMapValueCount(value);
      if (n > 0) return n;
    }
    return 0;
  }
  return 0;
}

function addMapCounts(target, attr, { allowedKeys = null, aliases = null } = {}) {
  for (const [rawKey, value] of dynamoMapEntries(attr)) {
    const key = (aliases && aliases[rawKey]) || rawKey;
    if (allowedKeys && !allowedKeys.has(key)) continue;
    const n = dynamoMapValueCount(value);
    target[key] = (target[key] || 0) + n;
  }
}

function seedCounts(keys) {
  const counts = {};
  for (const key of keys) counts[key] = 0;
  return counts;
}

/** Meals shown in tallies / seeded on signup. */
const MEAL_KEYS = [
  "day1_lunch",
  "day1_dinner",
  "midnight_snack",
  "day2_breakfast",
  "day2_lunch",
];
const MEAL_KEY_SET = new Set(MEAL_KEYS);
const MEAL_KEY_ALIASES = {
  day1_midnight_snack: "midnight_snack",
};
const MEAL_LABELS = {
  day1_lunch: "Day 1 Lunch",
  day1_dinner: "Day 1 Dinner",
  midnight_snack: "Midnight Snack",
  day2_breakfast: "Day 2 Breakfast",
  day2_lunch: "Day 2 Lunch",
};

/** Workshops + mini-events (read from workshops / events / miniEvents maps). */
const EVENT_KEYS = [
  "workshop_1",
  "workshop_2",
  "workshop_3",
  "workshop_4",
  "workshop_5",
  "workshop_6",
  "fireside_chat_with_umbc_alums",
  "mlh_session_potion_making",
  "jousting_tournament",
  "smash_tournament",
  "cup_stacking_tournament",
];
const EVENT_KEY_SET = new Set(EVENT_KEYS);
const EVENT_LABELS = {
  workshop_1: "Workshop 1",
  workshop_2: "Workshop 2",
  workshop_3: "Workshop 3",
  workshop_4: "Workshop 4",
  workshop_5: "Workshop 5",
  workshop_6: "Workshop 6",
  fireside_chat_with_umbc_alums: "Fireside Chat with UMBC Alums",
  mlh_session_potion_making: "MLH Session + Potion Making",
  jousting_tournament: "Jousting Tournament",
  smash_tournament: "Smash Tournament",
  cup_stacking_tournament: "Cup Stacking Tournament",
};

/** Prize / merch keys. Legacy names fold into the current set. */
const PRIZE_KEYS = [
  "frisbee",
  "fidget_spinner",
  "toy",
  "water_bottle",
  "mousepad",
];
const PRIZE_KEY_SET = new Set(PRIZE_KEYS);
const PRIZE_KEY_ALIASES = {
  spinner: "fidget_spinner",
  "fidget spinner": "fidget_spinner",
  "stress toy": "toy",
  bottle: "water_bottle",
  "water bottle": "water_bottle",
};
const PRIZE_LABELS = {
  frisbee: "Frisbee",
  fidget_spinner: "Fidget Spinner",
  toy: "Toy",
  water_bottle: "Water Bottle",
  mousepad: "Mousepad",
};

function countsToSortedRows(counts, labelMap = null) {
  return Object.entries(counts)
    .map(([key, count]) => ({
      key,
      label: (labelMap && labelMap[key]) || key,
      count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/**
 * On-demand event tallies from PWA METADATA.
 * Only known meal / event / prize keys are counted (no arbitrary DynamoDB keys).
 */
export async function getVenueEventTallies() {
  const mealCounts = seedCounts(MEAL_KEYS);
  const eventCounts = seedCounts(EVENT_KEYS);
  const prizeCounts = seedCounts(PRIZE_KEYS);
  let scanned = 0;
  let totalCheckedIn = 0;
  let ExclusiveStartKey;

  try {
    do {
      const result = await dynamodb.send(
        new ScanCommand({
          TableName: PWA_TABLE,
          ProjectionExpression:
            "checkedIn, meals, workshops, events, miniEvents, mini_events, merch, sk",
          FilterExpression: "sk = :sk",
          ExpressionAttributeValues: {
            ":sk": { S: "METADATA" },
          },
          ExclusiveStartKey,
        }),
      );

      for (const item of result.Items || []) {
        scanned += 1;
        if (dynamoBool(item.checkedIn)) totalCheckedIn += 1;

        addMapCounts(mealCounts, item.meals, {
          allowedKeys: MEAL_KEY_SET,
          aliases: MEAL_KEY_ALIASES,
        });
        for (const attr of [
          item.workshops,
          item.events,
          item.miniEvents,
          item.mini_events,
        ]) {
          addMapCounts(eventCounts, attr, { allowedKeys: EVENT_KEY_SET });
        }
        addMapCounts(prizeCounts, item.merch, {
          allowedKeys: PRIZE_KEY_SET,
          aliases: PRIZE_KEY_ALIASES,
        });
      }

      ExclusiveStartKey = result.LastEvaluatedKey;
    } while (ExclusiveStartKey);
  } catch (err) {
    if (err?.name === "ResourceNotFoundException") {
      throw new Error(
        `DynamoDB table "${PWA_TABLE}" was not found. Confirm HACKUMBC_AWS_PWA_TABLE_NAME and retry.`,
      );
    }
    throw err;
  }

  return {
    scanned,
    totalCheckedIn,
    meals: countsToSortedRows(mealCounts, MEAL_LABELS),
    workshops: countsToSortedRows(eventCounts, EVENT_LABELS),
    prizes: countsToSortedRows(prizeCounts, PRIZE_LABELS),
    generatedAt: new Date().toISOString(),
  };
}
