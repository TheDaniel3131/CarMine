import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await fetch("http://localhost:5208/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
      { success: false, message: error.message || "An error occurred." },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "An unknown error occurred." },
        { status: 500 }
      );
    }
  }
}

