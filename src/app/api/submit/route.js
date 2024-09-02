import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const data = {
      major: "",
    };

    formData.forEach((value, key) => {
      if (key === "agree") {
        return; // Skip this iteration
      }
      if (key === "resume") {
        sendResume(value);
        return;
      }
      if (key === "shareEmail" || key === "mediaConsent") {
        data[key] = value === "on";
      } else {
        // Initialize key with an empty string if it doesn't exist
        if (!data[key]) {
          data[key] = "";
        }
        data[key] += value + " ";
      }
    });

    console.log(data);

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

// Dummy function to handle resume
function sendResume(resume) {}
