"use client";

import { useState } from "react";
import { signInUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await signInUser(email, password);

    if (error) setError(error.message);
    else router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-pink-600 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-xl focus:ring-2 focus:ring-pink-600 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition">
          Login
        </button>

        {error && <p className="text-center mt-4 text-red-600">{error}</p>}

        <p className="text-center text-sm mt-4 text-gray-500">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-pink-600 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}