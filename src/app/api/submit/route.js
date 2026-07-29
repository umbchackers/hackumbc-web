import { NextResponse } from "next/server";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
//import { EmailTemplate } from "./EmailTemplate";
import { Resend } from "resend";
import { BrevoClient } from "@getbrevo/brevo";

//const resend = new Resend(process.env.NEXT_PUBLIC_AWS_RESEND_API_KEY);
const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const Table = process.env.NEXT_PUBLIC_AWS_TABLE_NAME;
const PwaTable = process.env.NEXT_PUBLIC_AWS_PWA_TABLE_NAME;

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

const dynamodb = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {

  let resumeKey;
  const verifyEndpoint =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  // In local dev, use Cloudflare's dummy "always passes" secret so a real
  // Turnstile challenge isn't required. Production uses the real secret.
  const secret = process.env.NEXT_PUBLIC_TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
  try {
    const formData = await request.formData();
    const token = formData.get("cf-turnstile-response");

    const verifyFormData = new URLSearchParams();
    verifyFormData.append("secret", secret);
    verifyFormData.append("response", token || "");

    const res = await fetch(verifyEndpoint, {
      method: "POST",
      body: verifyFormData,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const result = await res.json();
    if (!result.success) {
      console.log(result["error-codes"]);
      console.log(result);
      return NextResponse.json(
        { error: "Failed Verification" },
        { status: 400 },
      );
    }

    const data = { major: "" };
    const params = { TableName: Table, Item: {} };

    for (let [key, value] of formData.entries()) {
      if (key === "agree" || key === "agree2" || key === "cf-turnstile-response") continue;
      if (key === "resume") {
        if (value.size > 0) {
          resumeKey = await sendResume(value);
          data[key] = resumeKey;
          params.Item[key] = { S: resumeKey };
        } else {
          data[key] = "";
          params.Item[key] = { S: "" };
        }
        continue;
      }
      if (key === "shareEmail" || key === "mediaConsent" || key === "mlh_emailagreement") {
        const isChecked = value === "on" || value === "true" || value === true;
        data[key] = isChecked;
        params.Item[key] = { BOOL: isChecked };
      } else {
        const strValue = value !== undefined && value !== null ? String(value) : "";
        data[key] = strValue;
        params.Item[key] = { S: strValue };
      }
    }

    const consentFields = ["shareEmail", "mediaConsent", "mlh_emailagreement"];
    for (const field of consentFields) {
      if (!(field in params.Item)) {
        data[field] = false;
        params.Item[field] = { BOOL: false };
      }
    }

    const userId = uuidv4();
    params.Item["user_id"] = { S: userId.toString() };

    const email = data["email"]; // email as the sort key

    params.Item["email"] = { S: email };

    // write item
    try {
      await dynamodb.send(new PutItemCommand(params));
      console.log("Success", params);
    } catch (err) {
      console.error("DynamoDB write failed", err);
      // roll-back s3 if write failed for atomicity
      if (resumeKey) {
        await s3.send(new DeleteObjectCommand({ Bucket, Key: resumeKey }));
        console.log("S3 upload roll-back...");
      }
      return NextResponse.json(
        { error: "Transaction failed" },
        { status: 500 },
      );
    }

    // add new addition to PWA table
    try {
      const pwaParams = {
        TableName: PwaTable,
        Item: {
          pk: { S: `USER#${email}` },
          sk: { S: "METADATA" },
          email: { S: email },
          name: { S: `${data.firstName} ${data.lastName}`.trim() },
          checkedIn: { BOOL: false },
          createdAt: { S: new Date().toISOString() },
          role: { S: "student" },
          points: { N: "0" },
          tshirtSize: { S: data.tshirtSize},
          dietaryRestriction: { S: data.dietaryRestriction || "None"},
          meals: {
            M: {
              day1_lunch: { BOOL: false },
              day1_dinner: { BOOL: false },
              day1_midnight_snack: { BOOL: false},
              day2_breakfast: { BOOL: false },
              day2_lunch: { BOOL: false },
            },
          },
          merch: {
            M: {
              tshirt: { BOOL: false },
              frisbee: { BOOL: false },
              spinner: { BOOL: false},
              toy: {BOOL: false},
              sword: {BOOL: false},
              bottle: {BOOL: false},
            },
          },
        },
      };

      await dynamodb.send(new PutItemCommand(pwaParams));
    } catch (err) {
      console.error("PWA Table DynamoDB write failed", err);
    }

    try {
      const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
      if (!apiKey) {
        console.error("BREVO_API_KEY is not defined in environment variables!");
        return NextResponse.json(
          { message: "Registration saved, but BREVO_API_KEY is missing." },
          { status: 200 }
        );
      }
      const brevo = new BrevoClient({ apiKey });

      const response = await brevo.transactionalEmails.sendTransacEmail({
        templateId: 2,
        to: [{ email: data.email, name: `${data.firstName} ${data.lastName}` }],
        params: {FIRSTNAME: data.firstName, EMAIL: data.email},
      })

      return NextResponse.json(
        { message: "Form data sent successfully!", d: response },
        { status: 200 },
      );
    } catch (emailErr) {
      console.error("Failed to send email", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Unexpected error", error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 },
    );
  }
}

// function to handle resume upload
const sendResume = async (file) => {
  if (!file) return;

  const ext = file.name.split(".").pop();
  const uid = uuidv4().replace(/-/g, "");
  const fileName = `${uid}${ext ? "." + ext : ""}`;

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: Bucket, // should match s3 bucket name
      Key: fileName,
      Body: file,
      ContentType: file.type,
    },
  });
  await upload.done();
  return fileName;
};
