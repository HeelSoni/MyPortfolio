"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Percentage counter (approx 3 seconds)
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setComplete(true), 500); // Wait bit before fading
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#020204] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Background Ambient Pulse */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)] animate-pulse" />
          
          {/* Tactical Corner Brackets for Preloader */}
          <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-cyan-400/20" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-cyan-400/20" />

          {/* Central Logo / Symbol */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative mb-12"
          >
            <div className="text-4xl md:text-6xl font-display font-bold text-white tracking-widest leading-none">
              HS <span className="text-cyan-500">.</span>
            </div>
            {/* Spinning Circle around Logo */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border-[0.5px] border-dashed border-cyan-400/30 rounded-full"
            />
          </motion.div>

          {/* Loading Stats Display */}
          <div className="w-64 flex flex-col gap-4 font-mono text-[10px] tracking-[0.3em] uppercase">
            <div className="flex justify-between items-center text-cyan-400">
              <span className="animate-pulse">INITIALIZING_ANALYSIS</span>
              <span>{percent}%</span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                 style={{ width: `${percent}%` }}
               />
            </div>

            {/* Scrolling Technical Logs */}
            <div className="h-10 overflow-hidden text-white/20">
               <motion.div 
                 animate={{ y: [0, -100] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                 className="flex flex-col gap-2"
               >
                 <span>DECOMPRESSING_DATA_MODULES...</span>
                 <span>PARSING_STATISTICAL_MODELS...</span>
                 <span>ENCRYPTION_KEY_VERIFIED...</span>
                 <span>CONSTELLATION_RENDER_START...</span>
                 <span>GEOLOCATION_STABILIZED...</span>
                 <span>UI_SYNC_COMPLETE...</span>
               </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
