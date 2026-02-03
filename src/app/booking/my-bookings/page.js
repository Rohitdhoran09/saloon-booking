"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: true });

      if (!error) setBookings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    const { error } = await supabase
      .from("bookings")
      .update({ status: 'canceled' })
      .eq("id", bookingId);

    if (error) {
      alert("Error: " + error.message);
    } else {
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'canceled' } : b));
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafa] py-6 md:py-12 px-4 relative overflow-hidden">
      {/* Soft Decorative Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Very Responsive */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 font-serif tracking-tight">
              My <span className="text-pink-600">Glow</span> Appointments
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Manage your beauty and wellness journey</p>
          </div>
          <Link href="/services" className="w-full md:w-auto">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full md:w-auto bg-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-pink-700 transition-all"
            >
              + New Reservation
            </motion.button>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
            <p className="text-pink-600 font-bold tracking-widest text-xs uppercase">Fetching details...</p>
          </div>
        ) : bookings.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-md p-10 md:p-20 rounded-[2.5rem] text-center shadow-xl border border-white"
          >
            <span className="text-5xl block mb-4">✨</span>
            <h2 className="text-2xl font-bold text-gray-800">No Appointments Found</h2>
            <p className="text-gray-500 mb-8 mt-2 max-w-xs mx-auto">Ready for a transformation? Book your first session today.</p>
            <Link href="/services" className="bg-pink-100 text-pink-600 px-10 py-3 rounded-xl font-bold hover:bg-pink-200 transition-all inline-block">
              Browse Services
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode='popLayout'>
              {bookings.map((booking) => {
                const isCanceled = booking.status === 'canceled';

                return (
                  <motion.div 
                    key={booking.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`relative p-6 md:p-8 rounded-[2rem] shadow-xl border transition-all duration-500 flex flex-col justify-between ${
                      isCanceled 
                        ? "bg-gray-50/80 border-gray-200 opacity-75 blur-[0.4px]" 
                        : "bg-white/90 border-white hover:shadow-pink-100/50"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          isCanceled ? "bg-gray-200 text-gray-500" : "bg-green-100 text-green-600"
                        }`}>
                          {isCanceled ? "Canceled" : "Confirmed"}
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">#{booking.id.toString().slice(-4)}</span>
                      </div>

                      <h3 className={`text-xl md:text-2xl font-bold mb-6 ${isCanceled ? "text-gray-400" : "text-gray-900"}`}>
                        {booking.service}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-600">
                          <span className="p-2 bg-pink-50 rounded-lg text-sm">📅</span>
                          <span className="text-sm font-semibold">{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <span className="p-2 bg-purple-50 rounded-lg text-sm">⏰</span>
                          <span className="text-sm font-semibold">{booking.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-100">
                      {isCanceled ? (
                        <Link href={`/booking?service=${booking.service}`}>
                          <motion.button 
                            whileHover={{ scale: 1.02 }}
                            className="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-bold shadow-md tracking-widest uppercase"
                          >
                            Reschedule Now
                          </motion.button>
                        </Link>
                      ) : (
                        <button 
                          onClick={() => handleCancel(booking.id)}
                          className="w-full py-3 bg-white text-red-500 border border-red-100 rounded-xl text-xs font-bold hover:bg-red-50 transition-all tracking-widest uppercase"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;