"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { signOutUser } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

// Full List of Professional Services
const allServices = [
  { 
    id: 1,
    title: "Signature Facial", 
    description: "A customized facial treatment to cleanse, exfoliate, and hydrate your skin for a healthy glow.", 
    price: "$95",
    duration: "60 min",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    id: 2,
    title: "Deep Tissue Massage", 
    description: "Therapeutic massage targeting deep muscle layers to release chronic tension and stress.", 
    price: "$160",
    duration: "90 min",
    image: "https://images.unsplash.com/photo-1544161515-450ce4189605?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    id: 3,
    title: "Luxury Hair Spa", 
    description: "Deep conditioning treatment and scalp massage to restore shine and health to your hair.", 
    price: "$120",
    duration: "75 min",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    id: 4,
    title: "Classic Manicure", 
    description: "Expert nail shaping, cuticle care, and a flawless polish application for elegant hands.", 
    price: "$45",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1632345031435-81979cd75a3e?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    id: 5,
    title: "Balayage Coloring", 
    description: "Hand-painted highlights for a natural, sun-kissed look tailored to your hair type.", 
    price: "$210+",
    duration: "180 min",
    image: "https://images.unsplash.com/photo-1560869713-7d0a294308ed?q=80&w=2070&auto=format&fit=crop" 
  },
  { 
    id: 6,
    title: "Aromatherapy Package", 
    description: "A combination of essential oil massage and facial for ultimate mind-body relaxation.", 
    price: "$250",
    duration: "120 min",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop" 
  },
];

export default function ServicesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setIsLoggedIn(true);
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/login");
      } else {
        setIsLoggedIn(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    setShowDropdown(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#fdfaf7] font-sans">
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-lg border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tighter text-pink-600">
            GLOW<span className="text-gray-900 font-light">SALON</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-pink-600 transition">Home</Link>
            <Link href="/services" className="text-pink-600 font-bold underline underline-offset-8 decoration-2">Services</Link>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white hover:bg-pink-700 transition shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 10 }} 
                  className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-pink-50 py-2 z-[60]"
                >
                  <Link 
                    href="/booking/my-bookings" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition font-medium"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Bookings
                  </Link>
                  <button 
                    onClick={handleSignOut} 
                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition font-medium border-t border-gray-50"
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <div className="pt-40 pb-16 text-center px-6">
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-pink-600 font-bold tracking-[0.2em] uppercase text-xs"
        >
          Relax & Rejuvenate
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mt-4"
        >
          Our Exquisite Services
        </motion.h1>
        <p className="mt-6 text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Choose from our curated selection of luxury treatments designed to rejuvenate your spirit and enhance your natural beauty.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allServices.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-pink-50/50"
            >
              <div className="h-72 relative overflow-hidden bg-pink-50">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-pink-600 shadow-sm">
                  {service.duration}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">{service.title}</h3>
                  <span className="text-xl font-serif text-pink-600 font-bold">{service.price}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                  {service.description}
                </p>
                <Link 
                  href={`/booking?service=${encodeURIComponent(service.title)}`}
                  className="block text-center w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-pink-600 transition-all duration-300 shadow-lg active:scale-95"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}