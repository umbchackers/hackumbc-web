/**
 * DynamoDB access for registration analytics.
 *
 * - REGISTRATIONS_TABLE: live signup records (COUNT only; never modified here)
 * - METRICS_TABLE: time-series snapshots { timestamp, totalRegistrations }
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
