import { NextResponse } from "next/server";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { BrevoClient } from "@getbrevo/brevo";

const Bucket = process.env.HACKUMBC_AWS_BUCKET_NAME;
const Table = process.env.HACKUMBC_AWS_TABLE_NAME;
const PwaTable = process.env.HACKUMBC_AWS_PWA_TABLE_NAME;

const s3 = new S3Client({
  region: process.env.HACKUMBC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.HACKUMBC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.HACKUMBC_AWS_SECRET_ACCESS_KEY,
  },
});

const dynamodb = new DynamoDBClient({
  region: process.env.HACKUMBC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.HACKUMBC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.HACKUMBC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  let resumeKey = "";
  const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const secret = process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";

  try {
    const formData = await request.formData();
    const token = formData.get("cf-turnstile-response");

    const verifyFormData = new URLSearchParams();
    verifyFormData.append("secret", secret);
    verifyFormData.append("response", token || "");

    const res = await fetch(verifyEndpoint, {
      method: "POST",
      body: verifyFormData,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });

    const result = await res.json();
    if (!result.success) {
      return NextResponse.json({ error: "Failed Verification" }, { status: 400 });
    }

    const data = { major: "" };
    const params = { TableName: Table, Item: {} };
    let resumeFile = null;

    // Parse form entries (Hold the resume file without uploading yet)
    for (let [key, value] of formData.entries()) {
      if (key === "agree" || key === "agree2" || key === "cf-turnstile-response") continue;
      
      if (key === "resume") {
        if (value && value.size > 0) {
          resumeFile = value;
        }
        continue;
      }

      if (["shareEmail", "mediaConsent", "mlh_emailagreement"].includes(key)) {
        const isChecked = value === "on" || value === "true" || value === true;
        data[key] = isChecked;
        params.Item[key] = { BOOL: isChecked };
      } else {
        const strValue = value !== undefined && value !== null ? String(value) : "";
        data[key] = strValue;
        params.Item[key] = { S: strValue };
      }
    }

    // Default boolean consent fields
    const consentFields = ["shareEmail", "mediaConsent", "mlh_emailagreement"];
    for (const field of consentFields) {
      if (!(field in params.Item)) {
        data[field] = false;
        params.Item[field] = { BOOL: false };
      }
    }

    const userId = uuidv4();
    params.Item["user_id"] = { S: userId };

    const rawEmail = data["email"] || "";
    const cleanEmail = rawEmail.toLowerCase().trim();
    data["email"] = cleanEmail;
    params.Item["email"] = { S: cleanEmail };

    const ageNum = Number(data.age);
    const hasAge = Number.isFinite(ageNum);

    const university = (data.university || data.school || "").trim().toLowerCase();
    const isUMBC =
      university === "the university of maryland, baltimore county" ||
      university === "university of maryland, baltimore county" ||
      university === "umbc";
    const isMinor = hasAge && ageNum < 18;

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not defined in environment variables!");
      return NextResponse.json({ message: "BREVO_API_KEY is missing." }, { status: 500 });
    }
    const brevo = new BrevoClient({ apiKey });

    // Cancellation for non-UMBC minors
    if (isMinor && !isUMBC) {
      try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
          templateId: 5,
          to: [{ email: cleanEmail, name: `${data.firstName || ""} ${data.lastName || ""}`.trim() }],
          params: { FIRSTNAME: data.firstName, EMAIL: cleanEmail },
        });

        return NextResponse.json(
          { message: "Registration cancelled due to policy guidelines.", d: response },
          { status: 200 }
        );
      } catch (emailErr) {
        console.error("Failed to send cancellation email", emailErr);
        return NextResponse.json({ error: "Failed to send cancellation email" }, { status: 500 });
      }
    }

    if (resumeFile) {
      resumeKey = await sendResume(resumeFile);
    }
    data["resume"] = resumeKey;
    params.Item["resume"] = { S: resumeKey };

    try {
      await dynamodb.send(new PutItemCommand(params));
    } catch (err) {
      console.error("DynamoDB write failed", err);
      if (resumeKey) {
        await s3.send(new DeleteObjectCommand({ Bucket, Key: resumeKey }));
      }
      return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
    }

    // Write to PWA Table
    try {
      const pwaParams = {
        TableName: PwaTable,
        Item: {
          pk: { S: `USER#${cleanEmail}` },
          sk: { S: "METADATA" },
          email: { S: cleanEmail },
          name: { S: `${data.firstName || ""} ${data.lastName || ""}`.trim() || "hackUMBC Participant" },
          age: { N: String(data.age || 0) },
          checkedIn: { BOOL: false },
          ...(hasAge
            ? {
                age: { N: String(Math.trunc(ageNum)) },
                isMinor: { BOOL: ageNum < 18 },
              }
            : {}),
          createdAt: { S: new Date().toISOString() },
          role: { S: "student" },
          points: { N: "0" },
          tshirtSize: { S: data.tshirtSize || data.tshirt || "Unknown" },
          dietaryRestriction: { S: data.dietaryRestrictions || data.dietaryRestriction || "None" },
          meals: {
            M: {
              day1_lunch: { BOOL: false },
              day1_dinner: { BOOL: false },
              midnight_snack: { BOOL: false },
              day2_breakfast: { BOOL: false },
              day2_lunch: { BOOL: false },
            },
          },
          workshops: {
            M: {
              workshop_1: { BOOL: false },
              workshop_2: { BOOL: false },
              workshop_3: { BOOL: false },
              workshop_4: { BOOL: false },
              workshop_5: { BOOL: false },
              workshop_6: { BOOL: false },
              fireside_chat_with_umbc_alums: { BOOL: false },
            },
          },
          miniEvents: {
            M: {
              mlh_session_potion_making: { BOOL: false },
              jousting_tournament: { BOOL: false },
              smash_tournament: { BOOL: false },
              cup_stacking_tournament: { BOOL: false },
            },
          },
          merch: {
            M: {
              frisbee: { N: "0" },
              spinner: { N: "0" },
              toy: { N: "0" },
              bottle: { N: "0" },
              mousepad: { N: "0" },
            },
          },
        },
      };

      await dynamodb.send(new PutItemCommand(pwaParams));
    } catch (err) {
      console.error("PWA Table DynamoDB write failed", err);
    }

    // Send standard confirmation email (Template #2)
    try {
      const response = await brevo.transactionalEmails.sendTransacEmail({
        templateId: 2,
        to: [{ email: cleanEmail, name: `${data.firstName} ${data.lastName}` }],
        params: { FIRSTNAME: data.firstName, EMAIL: cleanEmail },
      });

      return NextResponse.json({ message: "Form data sent successfully!", d: response }, { status: 200 });
    } catch (emailErr) {
      console.error("Failed to send email", emailErr);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  } catch (error) {
    console.error("Unexpected error", error);
    return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
  }
}

const sendResume = async (file) => {
  if (!file) return "";

  const ext = file.name.split(".").pop();
  const uid = uuidv4().replace(/-/g, "");
  const fileName = `${uid}${ext ? "." + ext : ""}`;

  const upload = new Upload({
    client: s3,
    params: {
      Bucket,
      Key: fileName,
      Body: file,
      ContentType: file.type,
    },
  });
  await upload.done();
  return fileName;
};