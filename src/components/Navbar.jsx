"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, signOutUser } from "@/lib/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const adminEmail = "admin@glowsalon.com";

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600">
          GlowSalon
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/booking"
            className="text-gray-700 font-medium hover:text-pink-600"
          >
            Book Now
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600 px-2 py-1 border rounded-lg border-gray-300">
                {user.email}
              </span>

              {user.email === adminEmail && (
                <Link
                  href="/admin"
                  className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={async () => {
                  await signOutUser();
                  location.reload();
                }}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}