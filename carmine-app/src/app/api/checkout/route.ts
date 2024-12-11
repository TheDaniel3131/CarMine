// app/api/checkout/route.ts
import { NextResponse } from "next/server";

const API_URL = "http://localhost:5208";

// Define the request body interface
interface CheckoutRequestBody {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  carDetails: {
    id: string;
    make: string;
    model: string;
    year: number;
    trim: string;
    price: number;
    mileage: number;
    exteriorColor: string;
  };
}

// Validation function
function validateCheckoutRequest(body: unknown): body is CheckoutRequestBody {
  return (
    body !== null &&
    typeof body === "object" &&
    "cardNumber" in body &&
    "expirationDate" in body &&
    "cvv" in body &&
    "carDetails" in body &&
    body.carDetails !== null &&
    typeof body.carDetails === "object" &&
    "id" in body.carDetails &&
    "make" in body.carDetails &&
    "model" in body.carDetails &&
    "year" in body.carDetails &&
    "trim" in body.carDetails &&
    "price" in body.carDetails &&
    "mileage" in body.carDetails &&
    "exteriorColor" in body.carDetails &&
    typeof body.cardNumber === "string" &&
    typeof body.expirationDate === "string" &&
    typeof body.cvv === "string" &&
    typeof body.carDetails === "object" &&
    typeof body.carDetails.id === "string" &&
    typeof body.carDetails.make === "string" &&
    typeof body.carDetails.model === "string" &&
    typeof body.carDetails.year === "number" &&
    typeof body.carDetails.trim === "string" &&
    typeof body.carDetails.price === "number" &&
    typeof body.carDetails.mileage === "number" &&
    typeof body.carDetails.exteriorColor === "string"
  );
}

// Single POST handler that includes validation
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
    if (!validateCheckoutRequest(body)) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    // Basic card validation
    if (
      body.cardNumber.replace(/\s/g, "").length !== 16 ||
      body.cvv.length < 3 ||
      !body.expirationDate.match(/^\d{2}\/\d{2}$/)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid card details" },
        { status: 400 }
      );
    }

    // Forward the request to ASP.NET Core API
    const response = await fetch(`${API_URL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for this request
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to process checkout");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Checkout error:", error);

    // Check if it's a network error (e.g., ASP.NET Core API not running)
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to connect to the payment service. Please try again later.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An error occurred during checkout",
      },
      { status: 500 }
    );
  }
}
