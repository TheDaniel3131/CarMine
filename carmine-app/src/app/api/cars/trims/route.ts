// src/app/api/admin/cars/trims/route.ts
import { NextResponse } from "next/server";

const API_KEY = process.env.CAR_API_KEY;
const BASE_URL = "https://carapi.app/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const years = searchParams.getAll("year");
  const make = searchParams.get("make");
  const model = searchParams.get("model");

  const apiUrl = new URL(`${BASE_URL}/trims`);
  years.forEach((year) => apiUrl.searchParams.append("year", year));
  if (make) apiUrl.searchParams.append("make", make);
  if (model) apiUrl.searchParams.append("model", model);
  if (API_KEY) apiUrl.searchParams.append("api_token", API_KEY);

  try {
    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch trims");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching trims:", error);
    return NextResponse.json(
      { error: "Failed to fetch trims" },
      { status: 500 }
    );
  }
}
