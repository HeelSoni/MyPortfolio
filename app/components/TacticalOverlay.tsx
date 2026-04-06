"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function TacticalOverlay() {
  const { scrollYProgress } = useScroll();
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scrolling data points
  const dataValue = useTransform(scrollYProgress, [0, 1], [1024, 8192]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden select-none font-mono text-[10px] tracking-widest text-cyan-400/40 p-6 md:p-10 uppercase">
      
      {/* CORNER BRACKETS */}
      {/* Top Left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 w-12 h-12 border-l border-t border-cyan-400/20" />
      <div className="absolute top-12 left-10 hidden md:block">VIEWPORT_01 // SECURE</div>

      {/* Top Right */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 border-r border-t border-cyan-400/20 text-right" />
      <div className="absolute top-10 right-24 hidden md:block">DATA_STREAM_ALPHA</div>

      {/* Bottom Left */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-12 h-12 border-l border-b border-cyan-400/20" />
      <div className="absolute bottom-10 left-24 hidden md:block flex flex-col">
          <span>LAT: 22.5726</span>
          <span>LNG: 72.9289</span>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 border-r border-b border-cyan-400/20 text-right" />
      <div className="absolute bottom-12 right-10 hidden md:block">ANALYSIS_MODE // ACTIVE</div>

      {/* VERTICAL SCROLL DEPTH INDICATOR (Left) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 h-40 hidden md:flex flex-col justify-between items-start opacity-30">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent mx-auto" />
          <motion.div className="rotate-90 origin-left ml-4 whitespace-nowrap">DEPTH_{Math.round(scrollYProgress.get() * 1000)}m</motion.div>
      </div>

      {/* FLOATING MOUSE COORDINATES (Subtle) */}
      <div className="absolute top-1/2 right-14 -translate-y-1/2 hidden md:block opacity-20">
          <div className="mb-2">X_POS: {coords.x}</div>
          <div>Y_POS: {coords.y}</div>
      </div>

    </div>
  );
}
