"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Navbar
function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 bg-white/70 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          GlowSalon
        </Link>
        <div className="flex gap-4">
          <Link
            href="/signup"
            className="px-4 py-2 bg-pink-600 text-white rounded-2xl hover:bg-pink-700 transition"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 border-2 border-pink-600 text-pink-600 rounded-2xl hover:bg-pink-600 hover:text-white transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Slide data
const slides = [
  {
    title: "GlowSalon & Spa",
    description:
      "Relax, rejuvenate, and shine. Treat yourself to the ultimate beauty and wellness experience.",
    bgColor: "bg-gradient-to-br from-pink-100 via-pink-200 to-pink-50",
  },
  {
    title: "50% Off on First Visit",
    description:
      "New customers enjoy 50% off on any spa or salon service. Book now and indulge in luxury.",
    bgColor: "bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-50",
  },
  {
    title: "Premium Massage Packages",
    description:
      "Choose from our relaxing massage packages and feel completely rejuvenated.",
    bgColor: "bg-gradient-to-br from-purple-100 via-purple-200 to-purple-50",
  },
  {
    title: "Exclusive Hair & Beauty Offers",
    description:
      "Special discounts on hair treatments and beauty services this month.",
    bgColor: "bg-gradient-to-br from-green-100 via-green-200 to-green-50",
  },
];

// Services cards
const services = [
  {
    title: "Facial Treatments",
    description: "Glow your skin with our rejuvenating facial therapies.",
    icon: "💆‍♀️",
  },
  {
    title: "Body Massage",
    description: "Relax and relieve tension with professional massages.",
    icon: "💆‍♂️",
  },
  {
    title: "Hair & Spa",
    description: "Luxury hair care and spa treatments for ultimate pampering.",
    icon: "💇‍♀️",
  },
  {
    title: "Manicure & Pedicure",
    description: "Pamper your hands and feet with our expert care.",
    icon: "💅",
  },
  {
    title: "Hair Coloring",
    description: "Professional coloring to refresh your look.",
    icon: "🎨",
  },
  {
    title: "Special Packages",
    description: "Customizable combo packages for ultimate relaxation.",
    icon: "🛀",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Splash Carousel */}
      <div className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden pt-24">
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
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              {slides[current].description}
            </p>
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

        {/* Decorative floating elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300 rounded-full opacity-30 -z-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 -z-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-10 w-28 h-28 bg-purple-200 rounded-full opacity-30 -z-10 animate-pulse"></div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-pink-600">
          Our Services
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 px-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-pink-50 rounded-3xl p-8 shadow-lg flex flex-col items-center text-center hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-50 text-center">
        <h2 className="text-4xl font-bold mb-6 text-pink-700">
          Ready to Treat Yourself?
        </h2>
        <p className="text-gray-700 mb-8 max-w-lg mx-auto">
          Book your appointment now and enjoy a luxurious salon & spa experience.
        </p>
        <div className="flex justify-center gap-4">
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
      </section>
    </div>
  );
}