"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Menu, Sun, Moon, Inbox, LogOut, User} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/contexts/AuthContext";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  unreadMessages: number;
}

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [progress, setProgress] = useState(0);
  const [isToggling, setIsToggling] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isToggling) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsToggling(false);
            return 100;
          }
          return prev + 10;
        });
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isToggling]);

  const handleToggleDarkMode = () => {
    setProgress(0);
    setIsToggling(true);

    // Delay the actual dark mode toggle to match the progress animation
    setTimeout(() => {
      toggleDarkMode();
    }, 500);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = ["Marketplace", "Sell", "Contact"];

  return (
    <header
      className={`border-b ${
        darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
      } shadow-sm sticky top-0 z-50`}
    >
      <div className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <span
              className={`text-3xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              CarMine
            </span>
          </Link>
          {isAuthenticated && (
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`text-lg font-semibold ${
                    darkMode
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-gray-700 hover:text-blue-600"
                  } transition-colors`}
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleDarkMode}
                disabled={isToggling}
                className={`${darkMode ? "text-yellow-400" : "text-gray-600"} ${
                  isToggling ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              {isToggling && progress > 0 && progress < 100 && (
                <Progress
                  value={progress}
                  className="w-8 h-1 absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                />
              )}
            </div>
            {isAuthenticated && (
              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {isAuthenticated && (
              <Link href="/inbox">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <Inbox className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {isAuthenticated ? (
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
            ) : (
              <Link href="/signin">
                <Button
                  variant="outline"
                  className={`hidden font-bold md:inline-flex ${
                    darkMode
                      ? "bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  } font-semibold`}
                >
                  Sign In
                </Button>
              </Link>
            )}
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
                {isAuthenticated &&
                  navItems.map((item) => (
                    <DropdownMenuItem key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(" ", "")}`}
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
                      >
                        {item}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                {/* Profile Icon */}
                {isAuthenticated && (
                  <DropdownMenuItem>
                    <Link
                      href="/profile"
                      className={`flex w-full font-semibold transition-colors duration-300 ${
                        darkMode
                          ? "text-white hover:text-blue-400"
                          : "text-gray-900 hover:text-blue-600"
                      }`}
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                )}
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem>
                      <Link
                        href="/inbox"
                        className={`flex w-full font-semibold transition-colors duration-300 ${
                          darkMode
                            ? "text-white hover:text-blue-400"
                            : "text-gray-900 hover:text-blue-600"
                        }`}
                      >
                        Inbox
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={handleLogout}
                        className={`flex w-full font-semibold transition-colors duration-300 ${
                          darkMode
                            ? "text-white hover:text-blue-400"
                            : "text-gray-900 hover:text-blue-600"
                        }`}
                      >
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem>
                    <Link
                      href="/signin"
                      className={`flex w-full font-semibold transition-colors duration-300 ${
                        darkMode
                          ? "text-white hover:text-blue-400"
                          : "text-gray-900 hover:text-blue-600"
                      }`}
                    >
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}
