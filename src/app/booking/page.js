"use client";

import { useState, useEffect, Suspense } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Get the specific treatment name from the URL
  const selectedService = searchParams.get("service") || "Treatment";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: selectedService, // Automatically set to the clicked treatment
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Keep the hidden form state in sync with the URL
  useEffect(() => {
    setForm((prev) => ({ ...prev, service: selectedService }));
  }, [selectedService]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("bookings").insert([form]);

    if (error) {
      setMessage("❌ Booking failed: " + error.message);
    } else {
      setMessage(`✅ ${selectedService} booked successfully!`);
      setForm({ name: "", email: "", phone: "", service: selectedService, date: "", time: "" });
      setTimeout(() => router.push("/"), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] flex items-center justify-center px-4 relative py-12">
      <Link 
        href="/services" 
        className="absolute top-8 left-8 flex items-center gap-2 text-pink-600 font-bold hover:text-pink-700 transition-all z-50"
      >
        <span>←</span> Back to Services
      </Link>

      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="relative bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-xl border border-white"
      >
        <div className="text-center mb-10">
          <h1 className="text-xl font-serif font-bold text-pink-600 tracking-tight uppercase">
            GLOWSALON RESERVATION
          </h1>
          {/* Displaying the specific treatment name here instead of a dropdown */}
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 leading-tight">
            {selectedService}
          </h2>
          <p className="text-gray-500 text-sm mt-3">Please provide your details below to confirm your appointment.</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Your Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-4 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-pink-600 outline-none bg-pink-50/30 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-4 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-pink-600 outline-none bg-pink-50/30 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-4 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-pink-600 outline-none bg-pink-50/30 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Select Date</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-4 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-pink-600 outline-none bg-pink-50/30 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">Select Time</label>
              <input
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                className="w-full p-4 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-pink-600 outline-none bg-pink-50/30 transition-all"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold mt-10 hover:bg-pink-700 hover:shadow-lg transition-all transform active:scale-[0.98] disabled:bg-gray-300"
        >
          {loading ? "Processing..." : `Confirm ${selectedService}`}
        </button>

        {message && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`mt-6 p-4 rounded-xl text-center font-medium ${
              message.includes('❌') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
            }`}
          >
            {message}
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}

// Next.js requirement: Wrap components using useSearchParams in Suspense
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-pink-600">Loading Form...</div>}>
      <BookingForm />
    </Suspense>
  );
}