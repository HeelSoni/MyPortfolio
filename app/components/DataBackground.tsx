"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useMemo } from "react";

export default function DataBackground() {
  const { scrollYProgress } = useScroll();
  const time = useTime();
  
  // Parallax for the overall grid
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  
  // FIXED: Start visible during hero (low opacity) and fade in fully after
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0.1, 0.4, 1]);
  
  // Vibrant Neon Colors (Pink, Purple, Blue, Cyan)
  const neonColors = ["#ec4899", "#a855f7", "#6366f1", "#06b6d4"];

  // Generate 80+ 3D-moving particles for high-density "Constellation"
  const particles = useMemo(() => Array.from({ length: 85 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 110 - 5,
    initialY: Math.random() * 110 - 5,
    initialZ: Math.random() * 300,
    duration: 12 + Math.random() * 20,
    size: 3 + Math.random() * 5, // Increased size for visibility
    driftX: -50 + Math.random() * 100,
    driftY: -50 + Math.random() * 100,
    color: neonColors[Math.floor(Math.random() * neonColors.length)],
    delay: Math.random() * 8,
  })), []);

  return (
    <motion.div 
      style={{ opacity: bgOpacity }}
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#0a0a0f] select-none perspective-normal"
    >
      
      {/* Layer 1: High-Intensity Multi-Color Aura */}
      <motion.div 
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.2)_0%,rgba(168,85,247,0.15)_40%,transparent_70%)] blur-[160px]"
      />
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-30%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25)_0%,rgba(6,182,212,0.15)_50%,transparent_80%)] blur-[200px]"
      />

      {/* Layer 2: Technical Grid Texture */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 data-grid opacity-[0.18]"
      />

      {/* Layer 3: Vibrant 80+ 3D Neon Particles (Pink, Purple, Blue) */}
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
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.6, 1],
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
              boxShadow: `0 0 15px ${p.color}aa`, // Stronger Glow
            }}
          />
        ))}
      </div>

      {/* Layer 4: Distant Static Data Nodes (Stars) */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: "2px",
              height: "2px",
              backgroundColor: "#fff",
              opacity: 0.2,
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
            }}
          />
        ))}
      </div>

      {/* Global Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,5,8,0.8)_100%)]" />
      
      {/* Noise Overlay for Digital Texture */}
      <div className="noise-overlay opacity-[0.04]" />
    </motion.div>
  );
}
