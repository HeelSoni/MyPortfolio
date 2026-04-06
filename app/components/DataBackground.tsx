"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DataBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  // Floating data nodes constellation rendering
  const nodes = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * 5,
    size: 2 + Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#050508] select-none">
      {/* Layer 1: Professional Subtle Data Grid */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 data-grid opacity-[0.25]"
      />

      {/* Layer 2: Floating Data Constellation Nodes */}
      <div className="absolute inset-0">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute rounded-full bg-white/[0.08]"
            style={{
              top: node.top,
              left: node.left,
              width: node.size,
              height: node.size,
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.3, 1],
              y: [0, -30, 0],
            }}
            transition={{
              duration: node.duration,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Layer 3: Faint Data Stream Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent pointer-events-none" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,5,8,0.8)_80%)]" />
    </div>
  );
}
