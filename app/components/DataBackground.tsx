"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useMemo } from "react";

export default function DataBackground() {
  const { scrollYProgress } = useScroll();
  const time = useTime();
  
  // Parallax for the overall grid
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  // FIXED: Ensure background only appears AFTER the hero sequence (approx 0.15 for 600vh/TOTAL)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.14, 0.22], [0, 0, 1]);
  
  // FIXED: Neon Colors for unique attractive look (Pink, Purple, Blue)
  const neonColors = ["#ec4899", "#a855f7", "#6366f1", "#06b6d4"];

  // Generate random 3D-moving particles (constellation nodes)
  const particles = useMemo(() => Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 105 - 2,
    initialY: Math.random() * 105 - 2,
    initialZ: Math.random() * 200,
    duration: 15 + Math.random() * 25,
    size: 2 + Math.random() * 4,
    driftX: -40 + Math.random() * 80,
    driftY: -40 + Math.random() * 80,
    color: neonColors[Math.floor(Math.random() * neonColors.length)],
    delay: Math.random() * 10,
  })), []);

  return (
    <motion.div 
      style={{ opacity: bgOpacity }}
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#0a0a0f] select-none perspective-normal"
    >
      
      {/* Layer 1: Enhanced Visible Deep-Space Aura (Multi-Color) */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,rgba(168,85,247,0.1)_40%,transparent_70%)] blur-[150px]"
      />
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-30%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2)_0%,rgba(6,182,212,0.1)_50%,transparent_80%)] blur-[180px]"
      />

      {/* Layer 2: Technical Micro-Grid */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 data-grid opacity-[0.15]"
      />

      {/* Layer 3: 3D-Moving Particles (Constellation nodes) In Neon Pink, Purple, Blue */}
      <div className="absolute inset-0">
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
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.4, 1],
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
              boxShadow: `0 0 12px ${p.color}80`, // Glow matching color
            }}
          />
        ))}
      </div>

      {/* Layer 4: Distant Static Data Points (Stars) */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "1.5px",
              height: "1.5px",
              backgroundColor: "#fff",
              opacity: 0.15,
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.4)",
            }}
          />
        ))}
      </div>

      {/* Global Vignette Filter */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(5,5,8,0.7)_100%)]" />
      
      {/* Subtle Noise for Depth */}
      <div className="noise-overlay opacity-[0.03]" />
    </motion.div>
  );
}
