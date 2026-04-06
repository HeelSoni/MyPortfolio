"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useMemo } from "react";

export default function DataBackground() {
  const { scrollYProgress } = useScroll();
  const time = useTime();
  
  // Parallax for the overall motion
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  // SINGLE PROFESSIONAL NEON COLOUR (Cyan)
  const neonColor = "#06b6d4";

  // Generate 150+ VERY SMALL glowing nodes for a sophisticated high-end look
  const particles = useMemo(() => Array.from({ length: 180 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 102 - 1,
    initialY: Math.random() * 102 - 1,
    initialZ: Math.random() * 400 - 200,
    duration: 12 + Math.random() * 25,
    size: 1 + Math.random() * 2, // VERY SMALL DOTS (1px to 3px)
    driftX: -50 + Math.random() * 100,
    driftY: -50 + Math.random() * 100,
    delay: Math.random() * -20,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-20] overflow-hidden bg-black select-none">
      
      {/* 
        NEURAL MESH (SVG Lines) - Subtle Technical Texture 
      */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="meshPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.5" fill="rgba(6,182,212,0.2)" />
          <line x1="2" y1="2" x2="100" y2="100" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#meshPattern)" />
      </svg>

      {/* Atmospheric Depth Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.05)_0%,transparent_70%)] blur-[120px]" />

      {/* Layer 2: Subtle Vertical Data Streams */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            className="absolute w-[0.5px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              height: "30vh",
            }}
          />
        ))}
      </div>

      {/* Layer 3: 180+ VERY SMALL NEON DOTS (Single Color) */}
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
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.2, 1],
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
              backgroundColor: neonColor,
              boxShadow: `0 0 8px ${neonColor}80`, // Subtle Glow
            }}
          />
        ))}
      </motion.div>

      {/* Global Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]" />
      
      {/* Noise Texture */}
      <div className="noise-overlay opacity-[0.02]" />
    </div>
  );
}
