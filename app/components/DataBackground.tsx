"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useMemo } from "react";

export default function DataBackground() {
  const { scrollYProgress } = useScroll();
  const time = useTime();
  
  // Parallax for the overall grid
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  
  // Generate random data stream streams
  const streams = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    opacity: 0.05 + Math.random() * 0.1,
    height: 150 + Math.random() * 200,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#050508] select-none">
      
      {/* Layer 1: Unique Deep-Space Aura (Moving Gradients) */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-[0.15] blur-[150px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2)_0%,rgba(6,182,212,0.1)_40%,transparent_70%)]"
      />
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-30%] right-[-10%] w-[120%] h-[120%] opacity-[0.1] blur-[180px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2)_0%,rgba(16,185,129,0.05)_50%,transparent_80%)]"
      />

      {/* Layer 2: Technical Micro-Grid */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 opacity-[0.08]"
        className="data-grid bg-[length:60px_60px]"
      />

      {/* Layer 3: Vertical Flowing Data Streams (Digital Rain Effect) */}
      <div className="absolute inset-0 mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
        {streams.map((stream) => (
          <motion.div
            key={stream.id}
            initial={{ y: "-100%" }}
            animate={{ y: "200%" }}
            transition={{
              duration: stream.duration,
              delay: stream.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"
            style={{
              left: stream.left,
              height: stream.height,
              opacity: stream.opacity,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Distant Static Data Points (Stars) */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full opacity-[0.15]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 4px rgba(255, 255, 255, 0.4)",
            }}
          />
        ))}
      </div>

      {/* Global Vignette Filter */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,8,0.7)_90%)]" />
      
      {/* Subtle Noise for Texture */}
      <div className="noise-overlay opacity-[0.03]" />
    </div>
  );
}
