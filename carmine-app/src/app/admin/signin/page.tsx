"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminSigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveToLocalStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, value);
        // Verify the value was stored
        const storedValue = window.localStorage.getItem(key);
        console.log(`Stored ${key}:`, storedValue);
        if (storedValue !== value) {
          console.error("Storage verification failed");
        }
      } catch (error) {
        console.error("localStorage error:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        console.log("Admin login successful:", data);

        // Store the authentication state
        saveToLocalStorage("authenticated", "true");

        // Store the admin email
        if (email) {
          saveToLocalStorage("adminEmail", email);
        }

        // Double-check storage before redirect
        const storedAuth = window.localStorage.getItem("authenticated");
        const storedEmail = window.localStorage.getItem("adminEmail");
        console.log("Verification - Stored auth:", storedAuth);
        console.log("Verification - Stored admin email:", storedEmail);

        // Redirect to the admin area without the query parameter
        router.push("/admin/accessed/cars?authenticated=true");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Admin login error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="container mx-auto px-4 py-20 md:py-24">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              {loading && <p className="text-blue-500 mt-2">Logging in...</p>}
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <Button className="w-full mt-4" type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Link
              href="/admin/signup"
              className="text-sm text-blue-600 hover:underline"
            >
              Create an admin account
            </Link> */}
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
