"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600">
          GlowSalon
        </h1>

        <div className="flex gap-6 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/booking">Book Appointment</Link>
        </div>
      </div>
    </nav>
  );
}