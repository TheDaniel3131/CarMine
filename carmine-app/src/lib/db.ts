// lib/db.ts
import { Pool } from "pg";

// Create a new PostgreSQL pool using your .env.local variables
const pool = new Pool({
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || "5432"),
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
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
