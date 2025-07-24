"use client";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (auth: boolean) => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);

  useEffect(() => {
    // On mount, read from localStorage
    const stored = localStorage.getItem("isAuthenticated");
    if (stored === "true") setIsAuthenticatedState(true);
  }, []);

  const setIsAuthenticated = (auth: boolean) => {
    setIsAuthenticatedState(auth);
    localStorage.setItem("isAuthenticated", auth ? "true" : "false");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
} 