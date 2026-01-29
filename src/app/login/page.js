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
    <div className="min-h-screen flex items-center justify-center bg-[#fdf2f8] px-4 relative">
      {/* Back Button - Positioned at the top left */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 transition-all z-50"
      >
        <span>←</span> Back to Home
      </Link>

      {/* Decorative background blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <form
        onSubmit={handleLogin}
        className="relative bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-gray-800 tracking-tight">
            GLOW<span className="text-pink-600">SALON</span>
          </h1>
          <h2 className="text-3xl font-bold mt-4 text-gray-900">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-2">Login to manage your beauty appointments</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-pink-600 focus:outline-none bg-pink-50/50 transition-all placeholder:text-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-pink-600 focus:outline-none bg-pink-50/50 transition-all placeholder:text-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold mt-8 hover:bg-pink-700 hover:shadow-lg hover:shadow-pink-200 transition-all transform active:scale-[0.98]">
          Sign In
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-center text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}

        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-pink-600 font-bold hover:underline underline-offset-4">
              Create an Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}