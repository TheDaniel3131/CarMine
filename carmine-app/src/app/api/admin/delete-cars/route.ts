import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a connection pool
const pool = new Pool({
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || "5432"), // Default PostgreSQL port
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    max: 10, // Limit pool size for serverless
    idleTimeoutMillis: 30000, // Close idle connections after 30s
    connectionTimeoutMillis: 2000, // Fail if connection takes longer than 2s
    ssl: {
        rejectUnauthorized: false, // For self-signed certificates; set to true for production
    },
});

export const dynamic = "force-dynamic"; // Ensure route runs dynamically

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        // Execute SQL DELETE statement
        const result = await pool.query('DELETE FROM car WHERE car_id = $1', [id]);

        if (result.rowCount === 0) {
            throw new Error("Failed to delete car");
        }

        return NextResponse.json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json(
            { error: "Failed to delete car" },
            { status: 500 }
        );
    }
}
