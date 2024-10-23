"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import NavBar from "@/components/ui/NavBar";
import HomeCard from "@/components/ui/HomeCard";
import SearchBar from "@/components/ui/SearchBar";
import HomeFooter from "@/components/ui/HomeFooter";

const generateDots = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 50 + 10,
    opacity: Math.random() * 0.5 + 0.2,
  }));
};

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);
  const [dots] = useState(generateDots(50));
  const { scrollY } = useScroll();
  const scrollRef = useRef(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { once: true });

  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const navbarScale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const heroRect = heroRef.current?.getBoundingClientRect();
    if (heroRect) {
      const x = (clientX - heroRect.left) / heroRect.width;
      const y = (clientY - heroRect.top) / heroRect.height;
      setMousePosition({ x, y });
    }
  };

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 100);
      if (window.scrollY > 300 && !isSearchExpanded) {
        setIsSearchExpanded(true);
      }
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [isSearchExpanded]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 overflow-x-hidden">
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: [
            `radial-gradient(circle at ${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%, rgba(249,250,251,0.8) 0%, transparent 60%),
            linear-gradient(to bottom right, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)`,
            `radial-gradient(circle at ${(mousePosition.x + 0.1) * 100}% ${
              (mousePosition.y + 0.1) * 100
            }%, rgba(249,250,251,0.8) 0%, transparent 60%),
            linear-gradient(to bottom right, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 100%)`,
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating background dots */}
      {mounted && (
        <motion.div className="fixed inset-0 z-0 pointer-events-none">
          {dots.map((dot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: dot.opacity, scale: 1 }}
              transition={{
                duration: 4, // Increased duration for smoother animation
                repeat: Infinity,
                repeatType: "mirror", // Changed to mirror for smoother transition
                delay: index * 0.2, // Increased delay for less noticeable movement
              }}
              className="absolute bg-black rounded-full"
              style={{
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
              }}
            />
          ))}
        </motion.div>
      )}

      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        style={{ scale: navbarScale }}
      >
        <NavBar />
      </motion.div>

      <main className="relative" onMouseMove={handleMouseMove}>
        <div className="max-w-7xl mx-auto px-4 pt-24  relative z-10">
          <motion.header
            className="mb-12"
            style={{ opacity: headerOpacity, y: parallaxY }}
            ref={scrollRef}
          >
            <motion.div
              className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-12 overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              ref={heroRef}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8f9fa_1px,transparent_1px),linear-gradient(to_bottom,#f8f9fa_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-gray-100/30" />

              <motion.div
                className="relative z-10 space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.h1
                  className="text-5xl md:text-7xl grid justify-center font-bold tracking-tight leading-tight"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Welcome to
                  <br />
                  <span className="bg-clip-text text-transparent flex justify-center bg-gradient-to-r from-gray-950 via-gray-700 to-gray-950">
                    Your Shop
                  </span>
                </motion.h1>

                <motion.div
                  className="max-w-2xl mx-auto mt-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <SearchBar className="w-full transform hover:scale-105 transition-transform duration-300 shadow-lg" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.header>
        </div>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-20 -mt-8"
        >
          <HomeCard />
        </motion.section>
      </main>
      <footer>
        <HomeFooter></HomeFooter>
      </footer>
    </div>
  );
};

export default Home;
