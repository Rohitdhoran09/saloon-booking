"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("bookings").insert([form]);

if (error) {
  console.error(error);
  setMessage(error.message);
} else {
  setMessage("✅ Appointment booked successfully!");
}
    if (error) {
      setMessage("❌ Booking failed. Try again.");
    } else {
      setMessage("✅ Appointment booked successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        date: "",
        time: "",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Book Appointment
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        >
          <option value="">Select Service</option>
          <option>Hair Styling</option>
          <option>Facial Treatment</option>
          <option>Massage</option>
          <option>Manicure & Pedicure</option>
        </select>

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

        {message && (
          <p className="text-center mt-4 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}