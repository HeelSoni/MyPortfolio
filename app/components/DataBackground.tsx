"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useMemo } from "react";

export default function DataBackground() {
  const { scrollYProgress } = useScroll();
  const time = useTime();
  
  // Parallax for the overall motion
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // FIXED: Start visible immediately (low opacity) and fade in fully after hero
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0.2, 0.5, 1]);
  
  // Multi-Color Neon Palette (Pink, Purple, Blue, Cyan)
  const neonColors = ["#ec4899", "#a855f7", "#6366f1", "#06b6d4"];

  // Generate 150+ 3D-moving particles for a High-Density "Data Field"
  const particles = useMemo(() => Array.from({ length: 160 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 110 - 5,
    initialY: Math.random() * 110 - 5,
    initialZ: Math.random() * 800 - 400, // Deep 3D Space
    duration: 10 + Math.random() * 25,
    size: 2 + Math.random() * 3.5, // Dot-like size
    driftX: -60 + Math.random() * 120,
    driftY: -60 + Math.random() * 120,
    color: neonColors[Math.floor(Math.random() * neonColors.length)],
    delay: Math.random() * -20, // Start mid-animation for fluidity
  })), []);

  return (
    <motion.div 
      style={{ opacity: bgOpacity }}
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#000000] select-none"
    >
      {/* 
        3D DOTS / DATA FIELD 
        Specifically designed to look like a cinematic field of neon data points in 3D space.
      */}
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
              z: p.initialZ,
              opacity: 0,
            }}
            animate={{
              x: [`${p.initialX}vw`, `${p.initialX + (p.driftX / 2)}vw`, `${p.initialX}vw`],
              y: [`${p.initialY}vh`, `${p.initialY + (p.driftY / 2)}vh`, `${p.initialY}vh`],
              opacity: [0.1, 0.9, 0.1],
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
              boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}80`, // Intense Neon Glow
            }}
          />
        ))}
      </motion.div>

      {/* Very Subtle Aura for ambient professional depth (not plain black, but unique) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_80%)]" />

      {/* Global Cinematic Vignette to focus content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)]" />
      
      {/* Noise Overlay for Digital Texture */}
      <div className="noise-overlay opacity-[0.03]" />
    </motion.div>
  );
}
