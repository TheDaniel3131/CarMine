import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5208";

// Correct way to define dynamic route handler in App Router
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  console.log(`Request URL: ${request.url}`);
  console.log(`Fetching car records for userId: ${userId}`);

  try {
    const response = await fetch(`${API_BASE_URL}/api/carrecords/${userId}`);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch car records" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error(
      "Error fetching car records:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
