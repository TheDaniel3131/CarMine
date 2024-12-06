// src/app/api/admin/cars/engines/route.ts
import { NextResponse } from "next/server";

const API_KEY = process.env.CAR_API_KEY;
const BASE_URL = "https://carapi.app/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const years = searchParams.getAll("year");
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const trim = searchParams.get("trim");

  const apiUrl = new URL(`${BASE_URL}/engines`);
  years.forEach((year) => apiUrl.searchParams.append("year", year));
  if (make) apiUrl.searchParams.append("make", make);
  if (model) apiUrl.searchParams.append("model", model);
  if (trim) apiUrl.searchParams.append("trim", trim);
  if (API_KEY) apiUrl.searchParams.append("api_token", API_KEY);

  try {
    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch engines");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching engines:", error);
    return NextResponse.json(
      { error: "Failed to fetch engines" },
      { status: 500 }
    );
  }
}
