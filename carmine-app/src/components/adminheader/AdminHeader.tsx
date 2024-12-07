"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Sun, Moon, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeContext";

export default function AH() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleToggleDarkMode = () => {
    setProgress(0);
    toggleDarkMode();

    // Simulate a loading progress
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 50);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    localStorage.removeItem("authenticated");
    // After logout, redirect to login page
    router.push("/admin/signin");
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <header
        className={`border-b ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        } shadow-sm sticky top-0 z-50`}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-2"
            >
              <Car className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              <span
                className={`text-3xl font-bold ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                CarMine Admin
              </span>
            </Link>
            <div className="hidden md:flex space-x-8">
              {["Dashboard", "Cars", "Messages", "Users"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`/admin/accessed/${item.toLowerCase()}`}
                    className={`text-lg font-semibold ${
                      darkMode
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-gray-700 hover:text-blue-600"
                    } transition-colors`}
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleDarkMode}
                  className={darkMode ? "text-yellow-400" : "text-gray-600"}
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                {progress > 0 && progress < 100 && (
                  <Progress
                    value={progress}
                    className="w-8 h-1 absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                  />
                )}
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className={`hidden font-bold md:inline-flex ${
                  darkMode
                    ? "bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                    : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                } font-semibold`}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`md:hidden ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={`w-48 ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {["Dashboard", "Cars", "Users", "Reports", "Logout"].map(
                    (item) => (
                      <DropdownMenuItem key={item}>
                        <Link
                          href={
                            item === "Logout"
                              ? "#"
                              : `/admin/${item.toLowerCase()}`
                          }
                          className={`flex w-full font-semibold transition-colors duration-300 ${
                            darkMode
                              ? "text-white hover:text-blue-400"
                              : "text-gray-900 hover:text-blue-600"
                          }`}
                          style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            transition:
                              "background-color 0.3s ease, color 0.3s ease",
                          }}
                          onClick={item === "Logout" ? handleLogout : undefined}
                        >
                          {item}
                        </Link>
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
