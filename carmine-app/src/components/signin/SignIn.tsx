"use client";

import { useState, useEffect } from "react";
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
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Eye, EyeOff } from "lucide-react"; // Ensure you have lucide-react installed

export default function SigninPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [unreadMessages] = useState(2);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = window.localStorage.getItem("userEmail");
      const storedPassword = window.localStorage.getItem("userPassword");
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberMe(true);
        console.log("Loaded stored credentials:", {
          email: storedEmail,
          hasPassword: !!storedPassword,
        });
      } else {
        setEmail("");
        setPassword("");
        setRememberMe(false);
        console.log("No stored credentials found");
      }
    }
  }, []);

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

        if (rememberMe) {
          saveToLocalStorage("userEmail", email);
          saveToLocalStorage("userPassword", password);
          console.log("Saved credentials to localStorage");
        } else {
          // Clear stored credentials if remember me is unchecked
          window.localStorage.removeItem("userEmail");
          window.localStorage.removeItem("userPassword");
          console.log("Cleared stored credentials");
        }

        login(email, data.token);
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
    <div className={darkMode ? "dark" : ""}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        unreadMessages={unreadMessages}
        onLogout={() => {
          console.log("Logout clicked");
          // Implement logout functionality here
        }}
      />
      <section className="container mx-auto px-4 py-20 md:py-24 bg-gray-100 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Welcome Back
        </h1>
        <div className="max-w-lg mx-auto">
          <Card
            className={`shadow-lg rounded-lg ${
              darkMode ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">User Login</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">
                Please enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-6">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="email" className="text-lg">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? "bg-gray-700 text-white border-gray-600" : ""
                      }`}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="password" className="text-lg">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-600"
                            : ""
                        }`}
                      />
                      {password.length > 0 && (
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          {passwordVisible ? (
                            <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-base text-gray-700 dark:text-gray-300"
                    >
                      Remember Me
                    </Label>
                  </div>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <Button
                  className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  type="submit"
                >
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
      <Footer darkMode={darkMode} />
    </div>
  );
}
