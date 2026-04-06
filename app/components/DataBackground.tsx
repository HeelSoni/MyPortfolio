"use client";

import { motion, useScroll, useTransform, useTime } from "framer-motion";
import { useRef, useMemo } from "react";

export default function DataBackground() {
  const { scrollYProgress } = useScroll();
  const time = useTime();
  
  // Parallax for the overall grid
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  // Generate random 3D-moving particles (constellation nodes)
  const particles = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    initialZ: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    size: 2 + Math.random() * 3,
    driftX: -20 + Math.random() * 40,
    driftY: -20 + Math.random() * 40,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#050508] select-none perspective-normal">
      
      {/* Layer 1: Enhanced Visible Deep-Space Aura */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-0 w-full h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25)_0%,transparent_70%)] blur-[120px]"
      />
      <motion.div 
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-0 w-[80%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.2)_0%,transparent_70%)] blur-[150px]"
      />

      {/* Layer 2: Professional Micro-Grid */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 data-grid opacity-[0.12]"
      />

      {/* Layer 3: 3D-Moving Particles (Constellation nodes) */}
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
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-indigo-400/[0.4] shadow-[0_0_8px_rgba(99,102,241,0.3)]"
            style={{
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Vertical Data Streams (Re-added for "Unique" feel) */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          initial={{ y: "-100%" }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 5 + Math.random() * 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            height: "20vh",
            opacity: 0.1,
          }}
        />
      ))}

      {/* Global Vignette Filter */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,5,8,0.8)_100%)]" />
    </div>
  );
}
