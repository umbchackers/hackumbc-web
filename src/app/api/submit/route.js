import { NextResponse } from "next/server";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
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
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = {
      major: "",
    };
    const params = {
      TableName: Table, // name of table in dynamodb
      Item: {},
    };
    let resumeResult;

    for (let [key, value] of formData.entries()) {
      if (key === "agree" || key === "agree2") {
        continue;
      }
      if (key === "resume") {
        // error handle somewhere
        if (value.size > 0) {
          resumeResult = await sendResume(value);
          data[key] = resumeResult;
          params["Item"][key] = { S: resumeResult };
        } else {
          data[key] = "";
          params["Item"][key] = { S: "" };
        }
        continue;
      }
      if (
        key === "shareEmail" ||
        key === "mediaConsent" ||
        key === "mlh_emailagreement"
      ) {
        data[key] = value === "on";
        params["Item"][key] = { S: value === "on" };
      } else {
        data[key] += value;
        params["Item"][key] = { S: value };
      }
      data[key] = value;
      params["Item"][key] = { S: value };
    }

    const hackumbc_2025 = "hackumbc_registration_2025"; // static partition key for the mini-event
    const email = data["email"]; // email as the sort key
    
    params["Item"]["hackumbc_2025"] = { S: hackumbc_2025 }; // should match partition key
    params["Item"]["email"] = { S: email };
    
    console.log(data);
    console.log(params);

    // write item
    try {
      await dynamodb.send(new PutItemCommand(params));
      console.log("Success", params);
    } catch (err) {
      console.error("Error" + err);
      return NextResponse.json(
        { error: "Failed to handle form data." },
        { status: 500 }
      );
    }

    // read item back
    try {
      let result = await dynamodb.send(
        new GetItemCommand({
          TableName: Table, // should match table name
          Key: {
            hackumbc_2025: { S: hackumbc_2025 }, // should match partition key
            email: { S: email },
          },
        })
      );
      console.log("success");
      console.log(JSON.stringify(result));
    } catch (err) {
      console.error(err);
    }

    try {
      const { d, error } = await resend.emails.send({
        from: 'hackUMBC <send@hackumbc.tech>',
        to: [data["email"]],
        subject: 'Get Ready for hackUMBC 2025: Event Details Inside!',
        react: EmailTemplate({ 
          firstName: data["firstName"],
          lastName: data["lastName"],
          email: data["email"]
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
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to handle form data." },
      { status: 500 }
    );
  }
}

// function to handle resume upload
const sendResume = async (file) => {
  if (!file) {
    //empty, pass
    return;
  }

  const ext = file.name.split(".").pop();
  const uid = uuidv4().replace(/-/g, "");
  const fileName = `${uid}${ext ? "." + ext : ""}`;

  try {
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: Bucket, // should match s3 bucket name
        Key: fileName,
        Body: file,
        ContentType: file.type,
      },
    });

    // monitor progress
    upload.on("httpUploadProgress", (progress) => {
      //console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    });

    await upload.done();
    console.log(`File uploaded successfully as ${fileName}`);
    return fileName;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
