"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useMemo } from "react";

export default function DataBackground() {
  const { scrollYProgress } = useScroll();
  const time = useTime();
  
  // Parallax for the overall motion
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);
  
  // SINGLE PROFESSIONAL NEON COLOUR (Cyan)
  const neonColor = "#06b6d4";

  // Data Analysis Symbols (Fragments)
  const dataFragments = ["x̅", "σ", "r²", "Σ", "μ", "ρ", "Δ", "≈", "∫", "f(x)"];

  // Generate 180+ VERY SMALL glowing nodes
  const particles = useMemo(() => Array.from({ length: 170 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 105 - 2,
    initialY: Math.random() * 105 - 2,
    initialZ: Math.random() * 400 - 200,
    duration: 12 + Math.random() * 25,
    size: 1 + Math.random() * 2,
    driftX: -50 + Math.random() * 100,
    driftY: -50 + Math.random() * 100,
    delay: Math.random() * -20,
  })), []);

  // Generate 25 floating data fragments for "Completely Unique" feel
  const fragments = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: `frag-${i}`,
    symbol: dataFragments[Math.floor(Math.random() * dataFragments.length)],
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: 20 + Math.random() * 30,
    fontSize: 10 + Math.random() * 14,
    driftX: -30 + Math.random() * 60,
    driftY: -30 + Math.random() * 60,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020204] select-none">
      
      {/* 
        NEURAL MESH (SVG Lines) - High-End Structural Texture 
      */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
        <pattern id="meshPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.5" fill="rgba(6,182,212,0.2)" />
          <line x1="2" y1="2" x2="100" y2="100" stroke="rgba(6,182,212,0.15)" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(6,182,212,0.15)" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#meshPattern)" />
      </svg>

      {/* Atmospheric High-End Auras */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.06)_0%,transparent_70%)] blur-[100px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.05)_0%,transparent_70%)] blur-[130px]" />

      {/* Subtle Vertical Data Streams */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            className="absolute w-[0.5px] bg-gradient-to-b from-transparent via-cyan-500/25 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              height: "40vh",
            }}
          />
        ))}
      </div>

      {/* Layer 3: 170+ NEON DOTS & FLOATING ANALYSIS SYMBOLS */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 preserve-3d"
      >
        {/* Neon Data Nodes */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.initialX}vw`, y: `${p.initialY}vh`, z: p.initialZ }}
            animate={{
              x: [`${p.initialX}vw`, `${p.initialX + (p.driftX / 2)}vw`, `${p.initialX}vw`],
              y: [`${p.initialY}vh`, `${p.initialY + (p.driftY / 2)}vh`, `${p.initialY}vh`],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            className="absolute rounded-full"
            style={{ width: p.size, height: p.size, backgroundColor: neonColor, boxShadow: `0 0 10px ${neonColor}80` }}
          />
        ))}

        {/* Floating Data Analysis Fragments (x̅, σ, r², etc.) */}
        {fragments.map((f) => (
          <motion.div
            key={f.id}
            initial={{ x: `${f.initialX}vw`, y: `${f.initialY}vh` }}
            animate={{
              x: [`${f.initialX}vw`, `${f.initialX + f.driftX}vw`, `${f.initialX}vw`],
              y: [`${f.initialY}vh`, `${f.initialY + f.driftY}vh`, `${f.initialY}vh`],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: f.duration, repeat: Infinity, ease: "linear" }}
            className="absolute font-mono text-cyan-400/30 whitespace-nowrap overflow-hidden"
            style={{ fontSize: f.fontSize }}
          >
            {f.symbol}
          </motion.div>
        ))}
      </motion.div>

      {/* Global Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]" />
      
      {/* Subtle Noise Texture */}
      <div className="noise-overlay opacity-[0.03]" />
    </div>
  );
}
