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
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const saveToLocalStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, value);
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

        if (rememberMe && email) {
          saveToLocalStorage("userEmail", email);
        }

        login(data.token, { email: email });

        const storedEmail = window.localStorage.getItem("userEmail");
        console.log("Verification - Stored email:", storedEmail);

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
      <h1 className="text-4xl font-bold text-center mb-8">Welcome Back</h1>
      <div className="max-w-lg mx-auto">
        <Card className="shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">User Login</CardTitle>
            <CardDescription className="text-gray-500">
              Please enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email" className="text-lg">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password" className="text-lg">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Label htmlFor="rememberMe" className="text-base">
                    Remember Me
                  </Label>
                </div>
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <Button className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between mt-4">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
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
