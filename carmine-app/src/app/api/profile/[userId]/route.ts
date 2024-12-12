import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log(`Request URL: ${request.url}`);
  const { userId } = params;

  const response = await fetch(
    `http://localhost:5208/api/carrecords/${userId}`
  );
  const data = await response.json();

  return NextResponse.json(data);
}
