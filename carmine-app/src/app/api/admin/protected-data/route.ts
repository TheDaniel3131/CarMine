import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookies = req.headers.get("cookie");

  if (!cookies || !cookies.includes("admin-token=mock-admin-token")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // If the token is valid, return protected data
  return NextResponse.json(
    { data: "This is protected data for admin" },
    { status: 200 }
  );
}
