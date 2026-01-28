"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen flex items-center justify-center bg-[url('/spa.jpg')] bg-cover bg-center">
      <div className="bg-white/80 p-10 rounded-2xl text-center max-w-xl">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Relax. Refresh. Rejuvenate.
        </h2>

        <p className="text-gray-600 mb-6">
          Book your salon & spa appointment effortlessly
        </p>

        <Link
          href="/booking"
          className="inline-block bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}