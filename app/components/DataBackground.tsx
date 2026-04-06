"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useMemo } from "react";

export default function DataBackground() {
  const { scrollYProgress } = useScroll();
  const time = useTime();
  
  // Parallax for the overall motion
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);
  
  // Neon Colors (Vibrant Pink, Purple, Blue, Cyan)
  const neonColors = ["#ec4899", "#a855f7", "#6366f1", "#06b6d4"];

  // Generate 150+ glowing nodes for a true High-End Unique Data Environment
  const particles = useMemo(() => Array.from({ length: 160 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 102 - 1,
    initialY: Math.random() * 102 - 1,
    initialZ: Math.random() * 400 - 200,
    duration: 10 + Math.random() * 20,
    size: 3 + Math.random() * 5, // Increased size for visibility
    driftX: -60 + Math.random() * 120,
    driftY: -60 + Math.random() * 120,
    color: neonColors[Math.floor(Math.random() * neonColors.length)],
    delay: Math.random() * -10,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden bg-black select-none">
      
      {/* 
        NEURAL MESH (SVG Lines) - High Visibility 
        Providing a unique technical structural texture
      */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <pattern id="meshPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(6,182,212,0.4)" />
          <line x1="2" y1="2" x2="80" y2="80" stroke="url(#lineGrad)" strokeWidth="0.8" />
          <line x1="80" y1="0" x2="0" y2="80" stroke="url(#lineGrad)" strokeWidth="0.8" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#meshPattern)" />
      </svg>

      {/* High-Impact Cinematic Auras */}
      <motion.div 
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.2)_0%,transparent_60%)] blur-[150px]"
      />
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.15)_0%,transparent_70%)] blur-[180px]"
      />

      {/* Layer 2: Ultra-Sharp Vertical Data Streams (Re-designed for "Unique" feel) */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              height: "40vh",
              opacity: 0.2,
            }}
          />
        ))}
      </div>

      {/* Layer 3: 150+ HIGH-GLOW NEON DOTS */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 preserve-3d"
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: `${p.initialX}vw`, 
              y: `${p.initialY}vh`, 
              z: p.initialZ 
            }}
            animate={{
              x: [`${p.initialX}vw`, `${p.initialX + (p.driftX / 2)}vw`, `${p.initialX}vw`],
              y: [`${p.initialY}vh`, `${p.initialY + (p.driftY / 2)}vh`, `${p.initialY}vh`],
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 15px ${p.color}, 0 0 30px ${p.color}80`, // INTENSE NEON GLOW
            }}
          />
        ))}
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)]" />
      
      {/* Digital Noise */}
      <div className="noise-overlay opacity-[0.05]" />
    </div>
  );
}
