"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data?.user || data.user.email !== "admin@glowsalon.com") {
      router.push("/admin/login");
      return;
    }

    fetchBookings();
  };

  const fetchBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true });

    setBookings(data || []);
  };

  return (
    <div className="min-h-screen bg-voilet-800 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Service</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.name}</td>
                <td className="p-3">{b.service}</td>
                <td className="p-3">{b.date}</td>
                <td className="p-3">{b.time}</td>
                <td className="p-3">{b.phone}</td>
                <td className="p-3">{b.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}