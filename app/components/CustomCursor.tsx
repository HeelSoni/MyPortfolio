"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const dotCurrentPos = useRef({ x: 0, y: 0 });
  const ringCurrentPos = useRef({ x: 0, y: 0 });
  const orbitalCurrentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setCoords({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest("a, button, [role='button'], .interactive, .cursor-pointer, input, textarea"));
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const animate = () => {
      // Immediate follow for dot
      dotCurrentPos.current.x = mousePos.current.x;
      dotCurrentPos.current.y = mousePos.current.y;
      
      // Lerp for rings
      ringCurrentPos.current.x += (mousePos.current.x - ringCurrentPos.current.x) * 0.15;
      ringCurrentPos.current.y += (mousePos.current.y - ringCurrentPos.current.y) * 0.15;

      orbitalCurrentPos.current.x += (mousePos.current.x - orbitalCurrentPos.current.x) * 0.1;
      orbitalCurrentPos.current.y += (mousePos.current.y - orbitalCurrentPos.current.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCurrentPos.current.x}px, ${dotCurrentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCurrentPos.current.x}px, ${ringCurrentPos.current.y}px, 0) translate(-50%, -50%) scale(${isClicked ? 0.8 : 1})`;
      }
      if (orbitalRef.current) {
        orbitalRef.current.style.transform = `translate3d(${orbitalCurrentPos.current.x}px, ${orbitalCurrentPos.current.y}px, 0) translate(-50%, -50%) rotate(${Date.now() / 20}deg)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isClicked]);

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
      {/* 1. CENTRAL SIGNAL DOT */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-cyan-400 rounded-full"
      />

      {/* 2. INNER ROTATING CROSSHAIR BRACKETS (More attractive) */}
      <div
        ref={orbitalRef}
        className="fixed top-0 left-0 w-[30px] h-[30px] flex items-center justify-center"
      >
         <div className="absolute top-0 w-full h-[0.5px] bg-cyan-400 opacity-30" />
         <div className="absolute left-0 w-[0.5px] h-full bg-cyan-400 opacity-30" />
      </div>

      {/* 3. PREMIUM OUTER RING [ORBIT] */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-white/20 transition-all duration-300 ease-out flex items-center justify-center p-4"
        style={{
          width: isHovered ? "54px" : "34px",
          height: isHovered ? "54px" : "34px",
          borderColor: isHovered ? "#06b6d4" : "rgba(255, 255, 255, 0.2)",
          backgroundColor: isHovered ? "rgba(6, 182, 212, 0.05)" : "transparent",
        }}
      >
        {/* Dynamic Data Glyph (Analysis Mode) */}
        <div className={`transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5">
              <path d="M12 2v20M2 12h20M12 12l5 5" />
           </svg>
        </div>
      </div>

      {/* 4. LIVE COORDINATE TEXT (High-End Technical detail) */}
      <div 
        className="fixed top-0 left-0 pointer-events-none hidden md:block"
        style={{
          transform: `translate3d(${ringCurrentPos.current.x + 40}px, ${ringCurrentPos.current.y + 10}px, 0)`,
          opacity: 0.3
        }}
      >
        <span className="text-[7px] font-mono tracking-[0.2em] text-white uppercase whitespace-nowrap">
          {coords.x.toString().padStart(4, '0')} // {coords.y.toString().padStart(4, '0')}
        </span>
      </div>
    </div>
  );
}
