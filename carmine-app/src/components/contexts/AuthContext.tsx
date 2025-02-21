"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean; // Add the loading property to the context
  user: { email: string } | null; // Add the user property to the context
  login: (token: string, userData: { email: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Check if there's a token in localStorage on initial load
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setLoading(false); // Set loading to false once the token is checked
    }
  }, []);

  const login = (token: string, userData: { email: string }) => {
    setUser(userData);
    localStorage.setItem('authToken', token);
    localStorage.setItem("userEmail", userData.email);
    setIsAuthenticated(true);
    setLoading(false); // Set loading to false once the token is set
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};