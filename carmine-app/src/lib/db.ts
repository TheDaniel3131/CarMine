// lib/db.ts
import { Pool } from "pg";
// import fs from "fs";

// Create a new PostgreSQL pool using your .env.local variables
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
    // ca: fs.readFileSync("@/lib/us-east-1-bundle.pem").toString(), // Path to the root certificate
  },
});

export const db = {
  query: async (text: string, params?: (string | number)[]) => {
    const client = await pool.connect();
    try {
      const res = await client.query(text, params);
      return res;
    } finally {
      client.release();
    }
  },
};
