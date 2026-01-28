"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Slides data
const slides = [
  {
    title: "GlowSalon & Spa",
    description:
      "Experience ultimate relaxation and beauty at your fingertips. Book your appointment now and treat yourself to a moment of luxury.",
    bgColor: "bg-gradient-to-br from-pink-100 via-pink-200 to-pink-50",
  },
  {
    title: "Rejuvenating Massages",
    description:
      "Relieve stress and feel renewed with our professional massage therapies.",
    bgColor: "bg-gradient-to-br from-purple-100 via-purple-200 to-purple-50",
  },
  {
    title: "Luxury Spa Treatments",
    description:
      "Pamper yourself with our premium spa services and indulge in luxury.",
    bgColor: "bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-50",
  },
];

export default function SplashCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 flex flex-col items-center justify-center ${slides[current].bgColor} px-6`}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-pink-700 mb-6 drop-shadow-lg">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
            {slides[current].description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-pink-700 transition transform hover:scale-105"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-pink-600 text-pink-600 font-semibold rounded-2xl shadow-lg hover:bg-pink-600 hover:text-white transition transform hover:scale-105"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-pink-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}