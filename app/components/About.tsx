"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import ScrambleText from "./ScrambleText";
import { useRef } from "react";

export default function About() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-transparent"
    >
      {/* SVG Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Scroll-triggered Neon Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none -z-10"
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-12"}`}>
            <h2 className="font-display text-[var(--font-h1)] font-bold tracking-tighter mb-10 text-white leading-[0.85]">
              <ScrambleText text="Let's build" /> <br />
              <span className="text-indigo-400 neon-text-indigo">
                <ScrambleText text="together." />
              </span>
            </h2>
            <p className="text-[var(--font-body)] text-white/40 max-w-lg mb-14 font-light leading-relaxed group-hover:text-white/60 transition-colors">
              Whether you have a complex dataset that needs decoding, or a business problem looking for a data-driven solution, I'm ready to architect the strategy.
            </p>

            <div className="flex flex-wrap gap-6">
              <motion.a 
                href="mailto:contact@heelsoni.com" 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-indigo-600 text-white rounded-full font-bold flex items-center gap-4 group transition-all duration-500 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  Initialize Contact
                  <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                  initial={false}
                  whileTap={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
              
              <div className="flex gap-4">
                <a href="https://github.com/HeelSoni" target="_blank" rel="noopener noreferrer" className="w-16 h-16 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_20px_white] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="https://linkedin.com/in/heelsoni" target="_blank" rel="noopener noreferrer" className="w-16 h-16 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_20px_white] transition-all duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className={`relative w-80 h-80 md:w-[480px] md:h-[480px] flex items-center justify-center transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
              {/* HS Text - HIGH VISIBILITY NEON HIGHLIGHT */}
              <div className="relative z-20 flex flex-col items-center">
                <span className="font-display text-[12rem] md:text-[18rem] font-bold text-white select-none tracking-tighter leading-none shadow-[0_0_60px_rgba(255,255,255,0.15)] opacity-90 transition-all duration-700 hover:scale-105 hover:opacity-100">
                  HS
                </span>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-1 bg-indigo-500 shadow-[0_0_15px_#6366f1] mt-[-20px] md:mt-[-40px]"
                />
              </div>

              {/* Monogram Rings - High Brightness */}
              <div className="absolute inset-0 border-[3px] border-white/20 rounded-full animate-[spin_40s_linear_infinite] shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
              <div className="absolute inset-10 border border-indigo-500/40 rounded-full animate-[spin_25s_linear_infinite_reverse] shadow-[0_0_30px_rgba(99,102,241,0.2)]" />
              <div className="absolute inset-20 border border-white/10 rounded-full animate-[spin_50s_linear_infinite]" />
              
              {/* Rotating Neon Accent Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="48" 
                  fill="none" stroke="currentColor" 
                  strokeWidth="0.4" 
                  className="text-white/10"
                />
                <motion.circle 
                  cx="50" cy="50" r="48" 
                  fill="none" stroke="currentColor" 
                  strokeWidth="1.2" 
                  strokeDasharray="40 300"
                  className="text-indigo-400"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [0, -314] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  style={{ filter: "drop-shadow(0 0 8px #6366f1)" }}
                />
              </svg>

              {/* Central Intense Glow */}
              <div className="absolute w-48 h-48 bg-indigo-600/10 rounded-full blur-[80px]" />
            </div>
          </div>

        </div>

        <div className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 text-[11px] uppercase tracking-[0.4em] font-mono">
          <span>© {new Date().getFullYear()} Heel Soni // Data Architect</span>
          <span className="hidden md:block opacity-40">Tactical Precision // Analytical Clarity</span>
          <span className="lg:neon-text-indigo transition-all duration-500">Anand // IN</span>
        </div>
      </div>
    </section>
  );
}
