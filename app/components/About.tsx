"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";

export default function About() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-40 relative overflow-hidden bg-[#050508]"
    >
      {/* SVG Noise Overlay */}
      <div className="noise-overlay" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-10"}`}>
            <h2 className="font-display text-[var(--font-h1)] font-bold tracking-tight mb-8 text-white leading-[0.9]">
              Let's build <br />
              <span className="text-indigo-500">together.</span>
            </h2>
            <p className="text-[var(--font-body)] text-white/40 max-w-lg mb-12 font-light leading-relaxed">
              Whether you have a complex dataset that needs decoding, or a business problem looking for a data-driven solution, I'm ready to architect the strategy.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="mailto:contact@heelsoni.com" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold flex items-center gap-3 group transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] relative overflow-hidden"
              >
                {/* Ripple Effect Simulation */}
                <span className="relative z-10 flex items-center gap-2">
                  Initialize Contact
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                  initial={false}
                  whileTap={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>
              
              <div className="flex gap-4">
                <a href="https://github.com/HeelSoni" target="_blank" rel="noopener noreferrer" className="p-4 glass-card rounded-full hover:bg-white/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="https://linkedin.com/in/heelsoni" target="_blank" rel="noopener noreferrer" className="p-4 glass-card rounded-full hover:bg-white/10 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className={`relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
              <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border border-indigo-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              
              <span className="font-display text-8xl md:text-9xl font-bold text-white/[0.03] select-none tracking-tighter">
                HS
              </span>
              
              {/* Rotating Accent Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="48" 
                  fill="none" stroke="currentColor" 
                  strokeWidth="0.5" 
                  className="text-indigo-500/20"
                />
                <motion.circle 
                  cx="50" cy="50" r="48" 
                  fill="none" stroke="currentColor" 
                  strokeWidth="0.5" 
                  strokeDasharray="10 300"
                  className="text-indigo-500"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [0, -314] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>
          </div>

        </div>

        <div className="mt-40 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-[10px] uppercase tracking-widest font-mono">
          <span>© {new Date().getFullYear()} Heel Soni // Data Architect</span>
          <span className="hidden md:block">Engineered for Strategic Clarity</span>
          <span>Mumbai // IN</span>
        </div>
      </div>
    </section>
  );
}
