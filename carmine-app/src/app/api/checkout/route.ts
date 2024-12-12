import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || "5433"),
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
});

interface CheckoutRequestBody {
  userId: string; // Receive userId here
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

function validateCheckoutRequest(body: unknown): body is CheckoutRequestBody {
  return (
    body !== null &&
    typeof body === "object" &&
    "userId" in body && // Ensure userId is part of the body
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!validateCheckoutRequest(body)) {
      return NextResponse.json(
        { success: false, message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { userId, cardNumber, expirationDate, cvv, carDetails } = body;

    // Validate card details
    if (
      cardNumber.replace(/\s/g, "").length !== 16 ||
      cvv.length < 3 ||
      !expirationDate.match(/^\d{2}\/\d{2}$/)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid card details" },
        { status: 400 }
      );
    }

    // Get the next ID for CarPurchases
    const nextIdResult = await pool.query(
      'SELECT COALESCE(MAX("Id"), 0) + 1 as next_id FROM "CarPurchases"'
    );
    const nextId = nextIdResult.rows[0].next_id;

    // Generate a transaction ID
    const transactionId = `TRX-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Insert the purchase record
    await pool.query(
      `INSERT INTO "CarPurchases" (
        "Id", 
        "CarId",
        "Make",
        "Model",
        "Year",
        "Trim",
        "Price",
        "Mileage",
        "ExteriorColor",
        "PurchaseDate",
        "TransactionId",
        "PaymentStatus",
        "CreatedAt",
        "PurchaseType",
        "Status",
        "UserId"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        nextId,
        carDetails.id,
        carDetails.make,
        carDetails.model,
        carDetails.year,
        carDetails.trim,
        carDetails.price,
        carDetails.mileage,
        carDetails.exteriorColor,
        new Date(),
        transactionId,
        "Completed",
        new Date(),
        "Purchase",
        "Active",
        userId, // Store the userId here
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Purchase completed successfully",
      data: {
        purchaseId: nextId,
        transactionId,
        userId,
        carDetails,
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);

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
