// lib/auth.ts
import bcrypt from "bcryptjs";
import { db } from "@/lib/db"; // Import your database connection

// Function to hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Function to validate admin credentials (during login)
export async function validateAdmin(email: string, password: string): Promise<boolean> {
  // Fetch the hashed password for the given email
  const query = 'SELECT "PasswordHash" FROM public."Admins" WHERE "Email" = $1';
  const result = await db.query(query, [email]);

  if (result.rows.length === 0) {
    throw new Error("Admin not found");
  }
  const admin = result.rows[0];
  return await bcrypt.compare(password, admin.PasswordHash); // Verify the password
}
