import { NextResponse } from "next/server";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { EmailTemplate } from './EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_AWS_RESEND_API_KEY);
const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const Table = process.env.NEXT_PUBLIC_AWS_TABLE_NAME;

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

  try {
    const formData = await request.formData();
    const data = { major: "" };
    const params = { TableName: Table, Item: {} };

    for (let [key, value] of formData.entries()) {
      if (key === "agree" || key === "agree2") continue;
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
      if (
        key === "shareEmail" ||
        key === "mediaConsent" ||
        key === "mlh_emailagreement"
      ) {
        data[key] = value === "on";
        params.Item[key] = { S : (value === "on").toString() };
      } else {
        data[key] = value;
        params.Item[key] = { S: value };
      }
    }

    const userId = uuidv4();
    params.Item["user_id"] = { S: userId.toString() };

    const hackumbc_2025 = "hackumbc_registration_2025"; // static partition key for the mini-event
    const email = data["email"]; // email as the sort key
    
    params.Item["hackumbc_2025"] = { S: hackumbc_2025 }; // should match partition key
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
      return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
    }

    try {
      const { d, error } = await resend.emails.send({
        from: 'hackUMBC <send@hackumbc.tech>',
        to: [data.email],
        subject: 'hackUMBC 2025 Registration Confirmation',
        react: EmailTemplate({ 
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
         }),
      });
  
      if (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
      }
  
      return NextResponse.json(
        { message: "Form data sent successfully!", d },
        { status: 200 }
      );
    } catch (error) {
      console.error("Failed to send email", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
    
  } catch (error) {
    console.error("Unexpected error", error);
    return NextResponse.json({ error: `Internal server error: ${error}` }, { status: 500 });
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
