import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "30";
  const make = searchParams.get("make") || "";
  const sort = searchParams.get("sort") || "listed_date:desc";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const apiUrl = `https://auto.dev/api/listings?apikey=${API_KEY}&page=${page}&limit=${limit}${
    make ? `&make=${make}` : ""
  }&sort=${sort}`;

  try {
    const response = await fetch(apiUrl, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from auto.dev" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Add CORS headers
    const res = NextResponse.json(data);
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return res;
  } catch (error) {
    console.error("Error fetching car listings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  const res = new NextResponse(null, { status: 200 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return res;
}
