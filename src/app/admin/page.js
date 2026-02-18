"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0 });
  const router = useRouter();

  const ADMIN_EMAIL = "admin@gmail.com";

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      console.log("Checking Admin Access for:", user?.email);

      if (!user || user.email !== ADMIN_EMAIL) {
        console.log("Access Denied. Redirecting to login...");
        router.push("/login");
      } else {
        console.log("Access Granted. Fetching bookings...");
        fetchBookings();
      }
    };
    checkAdmin();
  }, [router]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setBookings(data);
      setStats({
        total: data.length,
        confirmed: data.filter(b => b.status === 'confirmed').length,
        pending: data.filter(b => b.status !== 'confirmed' && b.status !== 'canceled').length,
      });
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } else {
      alert("Error updating status: " + error.message);
    }
  };

  const deleteBooking = async (id) => {
    if (confirm("Permanently delete this booking record?")) {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (!error) fetchBookings();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col p-8 fixed h-full z-20">
        <div className="text-2xl font-serif font-bold text-pink-600 mb-12">
          GLOW<span className="text-gray-900 font-light text-xs uppercase tracking-[0.3em] ml-2">Portal</span>
        </div>
        <nav className="space-y-4">
          <button className="w-full flex items-center gap-3 px-6 py-4 bg-pink-50 text-pink-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">
            📊 Dashboard
          </button>
          <button onClick={() => router.push("/")} className="w-full flex items-center gap-3 px-6 py-4 text-gray-400 hover:bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest transition">
            🏠 Main Site
          </button>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-64 p-6 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Booking Management</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">Oversee all salon reservations</p>
          </div>
          <button onClick={fetchBookings} className="px-6 py-3 bg-white border text-gray-900 border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:shadow-lg transition flex items-center gap-2">
            <span>🔄</span> Refresh Data
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Requests", val: stats.total, bg: "bg-white", text: "text-gray-900" },
            { label: "Confirmed", val: stats.confirmed, bg: "bg-green-50", text: "text-green-600" },
            { label: "Pending", val: stats.pending, bg: "bg-orange-50", text: "text-orange-600" }
          ].map((s, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className={`${s.bg} p-8 rounded-[2.5rem] border border-gray-100 shadow-sm`}>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">{s.label}</p>
              <h3 className={`text-4xl font-serif font-bold ${s.text}`}>{s.val}</h3>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer Details</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Treatment</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Schedule</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status Control</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {loading ? (
                    <tr><td colSpan="5" className="px-8 py-20 text-center text-pink-600 font-bold animate-pulse text-xs tracking-widest">LOADING DATABASE...</td></tr>
                  ) : bookings.map((booking) => (
                    <motion.tr layout key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="font-bold text-gray-900 text-sm">{booking.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold mt-1 tracking-wider uppercase">{booking.phone}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 bg-pink-50 text-pink-600 text-[10px] font-black rounded-full uppercase tracking-tighter">
                          {booking.service}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-xs font-bold text-gray-700">{booking.date}</div>
                        <div className="text-[10px] text-gray-400 font-medium mt-1 uppercase">{booking.time}</div>
                      </td>
                      <td className="px-8 py-6">
                        <select 
                          value={booking.status || 'pending'} 
                          onChange={(e) => updateStatus(booking.id, e.target.value)}
                          className={`text-[10px] font-black uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer ${
                            booking.status === 'confirmed' ? 'text-green-500' : 'text-orange-400'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => deleteBooking(booking.id)}
                          className="text-gray-300 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors"
                        >
                          Archive
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}