import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5208";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log(`Request URL: ${request.url}`);
  const { userId } = params;

  const response = await fetch(
    `${API_BASE_URL}/api/carrecords/${userId}`
  );
  const data = await response.json();

  return NextResponse.json(data);
}
