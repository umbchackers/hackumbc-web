import { NextResponse, NextApiRequest } from "next/server";

export async function POST(request) {
  try {
    const body = await request.formData();

    console.log(body);
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
