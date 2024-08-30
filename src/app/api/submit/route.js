import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    console.log(formdData);

    return NextResponse.json(
      { message: "Form data sent successfully!" },
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
