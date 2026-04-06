"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TacticalHUD() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none">
      
      {/* Nano Banana: Floating Coordinate Tracker (Bottom Right) */}
      <div className="absolute bottom-[4%] right-[3%] flex flex-col font-mono text-[10px] md:text-xs text-cyan-500/60 tracking-wider">
        <div className="flex gap-4 border-r-2 border-cyan-500/20 pr-4">
          <span>X: {coords.x.toString().padStart(4, "0")}</span>
          <span>Y: {coords.y.toString().padStart(4, "0")}</span>
        </div>
        <div className="mt-1 opacity-40">SYSTEM_STREAM: [LIVE]</div>
      </div>

      {/* Top Left: Operational Status */}
      <div className="absolute top-[10%] left-[3%] flex flex-col font-mono text-[10px] md:text-xs text-cyan-500/40 tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>DATA_SYNC: ACTIVE</span>
        </div>
        <div className="mt-1">SECURE_CONNECTION: ESTABLISHED</div>
      </div>

      {/* Floating Tactical Brackets (Simulating Nano Banana Aesthetic) */}
      <div className="absolute top-[20%] right-[3%] w-24 h-24 border-t-2 border-r-2 border-cyan-500/10" />
      <div className="absolute bottom-[20%] left-[3%] w-24 h-24 border-b-2 border-l-2 border-cyan-500/10" />

      {/* Subtle Scanline Filter Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-[0.03]" />
      
    </div>
  );
}
