"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  
  // Trail Refs for "Data Stream" effect
  const trailRef1 = useRef<HTMLDivElement>(null);
  const trailRef2 = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const dotCurrentPos = useRef({ x: 0, y: 0 });
  const crosshairCurrentPos = useRef({ x: 0, y: 0 });
  const trail1Pos = useRef({ x: 0, y: 0 });
  const trail2Pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest("a, button, [role='button'], .interactive, .cursor-pointer, input, textarea"));
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const animate = () => {
      // Immediate follow for dot
      dotCurrentPos.current.x = mousePos.current.x;
      dotCurrentPos.current.y = mousePos.current.y;
      
      // Lerp for crosshair (smooth lag)
      crosshairCurrentPos.current.x += (mousePos.current.x - crosshairCurrentPos.current.x) * 0.15;
      crosshairCurrentPos.current.y += (mousePos.current.y - crosshairCurrentPos.current.y) * 0.15;

      // Lerp for trails
      trail1Pos.current.x += (mousePos.current.x - trail1Pos.current.x) * 0.1;
      trail1Pos.current.y += (mousePos.current.y - trail1Pos.current.y) * 0.1;
      
      trail2Pos.current.x += (trail1Pos.current.x - trail2Pos.current.x) * 0.08;
      trail2Pos.current.y += (trail1Pos.current.y - trail2Pos.current.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCurrentPos.current.x}px, ${dotCurrentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate3d(${crosshairCurrentPos.current.x}px, ${crosshairCurrentPos.current.y}px, 0) translate(-50%, -50%) scale(${isClicked ? 0.8 : 1})`;
      }
      if (trailRef1.current) {
        trailRef1.current.style.transform = `translate3d(${trail1Pos.current.x}px, ${trail1Pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trailRef2.current) {
        trailRef2.current.style.transform = `translate3d(${trail2Pos.current.x}px, ${trail2Pos.current.y}px, 0) translate(-50%, -50%)`;
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
      {/* TACTICAL DOT (Center point) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-cyan-400 rounded-full"
      />

      {/* DATA TRAIL */}
      <div ref={trailRef1} className="fixed top-0 left-0 w-[2px] h-[2px] bg-cyan-400/40 rounded-full" />
      <div ref={trailRef2} className="fixed top-0 left-0 w-[1.5px] h-[1.5px] bg-indigo-400/20 rounded-full" />

      {/* TACTICAL DATA CROSSHAIR [ ] */}
      <div
        ref={crosshairRef}
        className="fixed top-0 left-0 transition-all duration-300 ease-out flex items-center justify-center opacity-60"
        style={{
          width: isHovered ? "50px" : "30px",
          height: isHovered ? "50px" : "30px",
        }}
      >
        {/* Left Brackets */}
        <div className="absolute left-0 top-0 bottom-0 w-[6px] border-l-[1.5px] border-t-[1.5px] border-b-[1.5px] border-cyan-400/80 rounded-l-md" />
        {/* Right Brackets */}
        <div className="absolute right-0 top-0 bottom-0 w-[6px] border-r-[1.5px] border-t-[1.5px] border-b-[1.5px] border-cyan-400/80 rounded-r-md" />
        
        {/* ANALYSIS GLYPH ON HOVER */}
        <div className={`transition-opacity duration-300 ${isHovered ? "opacity-40" : "opacity-0"}`}>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M18 20V10M12 20V4M6 20v-6" />
           </svg>
        </div>
      </div>
    </div>
  );
}
