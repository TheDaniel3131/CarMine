"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthContextType } from "@/lib/interfaces";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const sessionEmail = localStorage.getItem("sessionEmail"); // Use different key for session

      if (loginStatus === "true" && sessionEmail) {
        setIsAuthenticated(true);
        setUserEmail(sessionEmail);
      } else {
        // Clear only authentication data
        clearAuthData();
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const clearAuthData = () => {
    // Clear only session/authentication data
    localStorage.removeItem("userToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("sessionEmail"); // Clear session email
    localStorage.removeItem("userProfile");
    localStorage.removeItem("userPreferences");

    // DO NOT touch userEmail and userPassword - they're for "Remember Me"

    setIsAuthenticated(false);
    setUserEmail(null);
  };

  const login = (email: string, token?: string) => {
    // Store session data (separate from remember me data)
    localStorage.setItem("sessionEmail", email); // Use different key
    localStorage.setItem("isLoggedIn", "true");
    if (token) {
      localStorage.setItem("userToken", token);
    }

    // Update state
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    // Only clear session data, preserve remember me data
    clearAuthData();
  };

  const value = {
    isAuthenticated,
    userEmail,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
