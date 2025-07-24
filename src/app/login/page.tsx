"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password (change as needed)
    if (password === "Divaydua@12") {
      setIsAuthenticated(true);
      router.push("/");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-slate-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
} 