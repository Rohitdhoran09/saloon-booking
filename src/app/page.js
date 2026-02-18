"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { signOutUser } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient"; 
import { useRouter } from "next/navigation";

const slides = [
  {
    title: "GlowSalon & Spa",
    description: "Relax, rejuvenate, and shine. Treat yourself to the ultimate beauty and wellness experience.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2070",
  },
  {
    title: "50% Off on First Visit",
    description: "New customers enjoy 50% off on any spa or salon service. Book now and indulge in luxury.",
    image: "https://wallpapers.com/images/hd/hair-salon-background-ocd8o0oatvbqyg39.jpg",
  },
  {
    title: "Premium Massage",
    description: "Choose from our relaxing massage packages and feel completely rejuvenated.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=2070",
  },
];

const services = [
  { title: "Facial Treatments", description: "Glow your skin with our rejuvenating facial therapies.", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop" },
  { title: "Body Massage", description: "Relax and relieve tension with professional massages.", image: "https://tse2.mm.bing.net/th/id/OIP.DWmY5ECei_o8SfmuyrlLaAHaEK?pid=Api&P=0&h=180" },
  { title: "Hair & Spa", description: "Luxury hair care and spa treatments for ultimate pampering.", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2070&auto=format&fit=crop" },
  { title: "Manicure & Pedicure", description: "Pamper your hands and feet with our expert care.", image: "https://tse2.mm.bing.net/th/id/OIP.eMFMTqPzdFWQPFzx4_XYowHaEK?pid=Api&P=0&h=180" },
  { title: "Hair Coloring", description: "Professional coloring to refresh your look.", image: "https://tse3.mm.bing.net/th/id/OIP.m2kFAo_l9S-n6-kY-fWLPgHaJc?pid=Api&P=0&h=180" },
  { title: "Special Packages", description: "Customizable combo packages for ultimate relaxation.", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop" },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (!session) {
          router.refresh(); 
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    setIsLoggedIn(false);
    setShowDropdown(false);
    router.push("/login");
  };

  const handleToServices = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/services");
    }
  };

  // Logic changed to scroll to the services section instead of going to /booking
  const handleToBooking = (e) => {
    e.preventDefault();
    const section = document.getElementById("services-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-white">
      {/* 1. NAVBAR */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-lg border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tighter text-pink-600">
            GLOW<span className="text-gray-900 font-light">SALON</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-pink-600 transition">Home</Link>
            <Link href="/services" onClick={handleToServices} className="hover:text-pink-600 transition">Our Services</Link>
            {/* Updated onClick for scrolling */}
            <Link href="#services-section" onClick={handleToBooking} className="hover:text-pink-600 transition">Book Appointment</Link>
          </div>

          <div className="flex gap-3 relative" ref={dropdownRef}>
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="px-5 py-2 text-sm font-semibold text-pink-600 border border-pink-600 rounded-full hover:bg-pink-50 transition">
                  Login
                </Link>
                <Link href="/signup" className="px-5 py-2 text-sm font-semibold bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow-md transition">
                  Join Now
                </Link>
              </>
            ) : (
              <div className="relative">
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
            )}
          </div>
        </div>
      </nav>

      {/* 2. HERO CAROUSEL */}
      <div className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={slides[current].image} 
              alt={slides[current].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            {slides[current].title}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl text-pink-50 max-w-2xl mb-10 font-light"
          >
            {slides[current].description}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button 
              onClick={(e) => isLoggedIn ? router.push("/services") : router.push("/login")}
              className="px-10 py-4 bg-pink-600 text-white text-lg font-bold rounded-full hover:bg-pink-700 shadow-2xl transition transform hover:scale-105"
            >
              Book Your Session
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1 transition-all duration-500 ${index === current ? "w-12 bg-pink-500" : "w-6 bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* 3. LUXURY TREATMENTS SECTION - Added id="services-section" here */}
      <section id="services-section" className="py-24 bg-[#fdfaf7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-pink-600 font-bold tracking-[0.2em] uppercase text-xs"
            >
              Exquisite Wellness
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mt-3"
            >
              Luxury Treatments
            </motion.h3>
            <div className="w-24 h-1 bg-pink-200 mx-auto mt-6 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] p-3 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out"
              >
                <div className="relative h-80 w-full rounded-[2rem] overflow-hidden bg-pink-50">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                  </div>
                  <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white z-20">
                    Premium
                  </div>
                </div>

                <div className="p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 leading-relaxed text-sm mb-6 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <button 
                    onClick={(e) => isLoggedIn ? router.push("/services") : router.push("/login")}
                    className="flex items-center justify-center w-full py-4 bg-pink-50 text-pink-600 font-bold rounded-2xl group-hover:bg-pink-600 group-hover:text-white transition-all duration-300"
                  >
                    Reserve Now
                    <motion.span 
                      animate={{ x: [0, 5, 0] }} 
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER SECTION */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h4 className="text-2xl font-serif font-bold tracking-tighter text-pink-500">
                GLOW<span className="text-white font-light">SALON</span>
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Experience the height of luxury and relaxation. Our expert therapists are dedicated to your complete wellness and inner peace.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-6">Quick Links</h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-pink-500 transition">Home</Link></li>
                <li><Link href="/services" onClick={handleToServices} className="hover:text-pink-500 transition">Our Services</Link></li>
                {/* Footer link updated too */}
                <li><Link href="#services-section" onClick={handleToBooking} className="hover:text-pink-500 transition">Book Appointment</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-6">Contact Us</h5>
              <ul className="space-y-4 text-gray-400 text-sm font-light">
                <li className="flex gap-3">📍 123 Wellness Ave, Ganesh Nagar, pune</li>
                <li className="flex gap-3">📞 8766508715</li>
                <li className="flex gap-3">✉️ official@glowsalon.com</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-6">Opening Hours</h5>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex justify-between"><span>Mon - Fri</span><span className="text-white">9:00 AM - 8:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span><span className="text-white">10:00 AM - 6:00 PM</span></li>
                <li className="flex justify-between font-bold text-pink-500"><span>Sunday</span><span>Closed</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-800 text-center text-gray-500 text-xs">
            <p>© 2026 GlowSalon & Spa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}