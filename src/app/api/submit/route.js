import { NextResponse } from "next/server";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
// import { AWS } from 'aws-sdk';
const AWS = require('aws-sdk');

const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

AWS.config.update({ region: "us-east-1" });
const dynamodb = new AWS.DynamoDB({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  }
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = {
      major: "",
    };
    const params = {
      TableName: 'hackumbc-registration',
      Item: {}
    }
    let resumeResult;

    for (let [key, value] of formData.entries()) {
      if (key === "agree") {
        continue;
      }
      if (key === "resume") {
        // error handle somewhere
        if (value.size > 0) {
          resumeResult = await sendResume(value);
          data[key] = resumeResult;
          params['Item'][key] = {'S': resumeResult};
        }
        else {
          data[key] = '';
          params['Item'][key] = {'S': ''};
        }
        continue;
      }
      if (key === "shareEmail" || key === "mediaConsent") {
        data[key] = value === "on";
        params['Item'][key] = {'S': value === 'on'};
      } else {
        data[key] += value;
        params['Item'][key] = {'S': value};
      }
      data[key] = value;
      params['Item'][key] = {'S': value};
    }

    data['registration_time'] = new Date().toISOString();
    params['Item']['registration_time'] = {'S': new Date().toISOString()};

    dynamodb.putItem(params, (err, d) => {
      if (err) {
        console.log('Error', err);
      }
      else{
        console.log('Success', d);
      }
    });

    return NextResponse.json(
      { message: "Form data sent successfully!", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to handle form data." },
      { status: 500 }
    );
  }
}

// Function to handle resume upload
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
        Bucket,
        Key: fileName,
        Body: file,
        ContentType: file.type,
      },
    });

    // Monitor progress
    upload.on("httpUploadProgress", (progress) => {
      //console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    });

    await upload.done();
    console.log(`File uploaded successfully as ${fileName}`);
    return uid;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
