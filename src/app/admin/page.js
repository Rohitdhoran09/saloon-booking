"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const adminEmail = "admin@glowsalon.com";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = await getCurrentUser();
      if (!user || user.email !== adminEmail) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking permissions...
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Only admins can see this page.</p>
    </div>
  );
}