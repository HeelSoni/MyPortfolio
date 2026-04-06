"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useMemo } from "react";

export default function DataBackground() {
  const { scrollYProgress } = useScroll();
  const time = useTime();
  
  // Parallax for the overall motion
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // Multi-Color Neon Palette
  const neonColors = ["#ec4899", "#a855f7", "#6366f1", "#06b6d4"];

  // Generate 120 nodes for a High-Density field
  const particles = useMemo(() => Array.from({ length: 120 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    initialZ: Math.random() * 600 - 300,
    duration: 15 + Math.random() * 20,
    size: 2 + Math.random() * 4,
    driftX: -40 + Math.random() * 80,
    driftY: -40 + Math.random() * 80,
    color: neonColors[Math.floor(Math.random() * neonColors.length)],
    delay: Math.random() * -20,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#020204] select-none">
      
      {/* 
        NEURAL MESH (SVG Lines) 
        Connecting bits of logic to ensure the background is never "plain"
      */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <pattern id="meshPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.5" fill="rgba(99,102,241,0.3)" />
          <line x1="2" y1="2" x2="100" y2="100" stroke="url(#lineGrad)" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="url(#lineGrad)" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#meshPattern)" />
      </svg>

      {/* Layer 1: High-Intensity Deep-Space Auras (Visible and Professional) */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15)_0%,transparent_60%)] blur-[120px]"
      />
      <motion.div 
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.1)_0%,transparent_70%)] blur-[150px]"
      />

      {/* Layer 2: Ultra-Sharp Technical Grid */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 data-grid opacity-[0.2]"
      />

      {/* Layer 3: Drifting Neon Particles (Data Nodes) */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0"
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
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
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
              boxShadow: `0 0 10px ${p.color}aa`,
            }}
          />
        ))}
      </motion.div>

      {/* Global Vignette (Cinema Depth) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,2,4,0.9)_100%)]" />
      
      {/* Noise Filter (Technical Texture) */}
      <div className="noise-overlay opacity-[0.05]" />
    </div>
  );
}
