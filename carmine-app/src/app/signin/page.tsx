"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { useAuth } from "@/components/contexts/AuthContext";
import "../globals.css";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

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

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        // First store the email
        if (email) {
          saveToLocalStorage("userEmail", email);
        }

        // Then handle the login
        login(data.token, { email: email });

        // Double-check storage before redirect
        const storedEmail = window.localStorage.getItem("userEmail");
        console.log("Verification - Stored email:", storedEmail);

        // Redirect to homepage
        router.push("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    }
  };

  return (
    <section className="container mx-auto px-4 py-20 md:py-24">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
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
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <Button className="w-full mt-4" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              href="/signup"
              className="text-sm text-blue-600 hover:underline"
            >
              Create an account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
