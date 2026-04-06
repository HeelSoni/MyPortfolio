"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  
  // Trail Refs for "Data Stream" effect
  const trailRef1 = useRef<HTMLDivElement>(null);
  const trailRef2 = useRef<HTMLDivElement>(null);
  const trailRef3 = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const dotCurrentPos = useRef({ x: 0, y: 0 });
  const ringCurrentPos = useRef({ x: 0, y: 0 });
  const trail1Pos = useRef({ x: 0, y: 0 });
  const trail2Pos = useRef({ x: 0, y: 0 });
  const trail3Pos = useRef({ x: 0, y: 0 });

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
      
      // Lerp for ring (smooth lag)
      ringCurrentPos.current.x += (mousePos.current.x - ringCurrentPos.current.x) * 0.15;
      ringCurrentPos.current.y += (mousePos.current.y - ringCurrentPos.current.y) * 0.15;

      // Lerp for trails (staggered delay for "Data Trail" effect)
      trail1Pos.current.x += (mousePos.current.x - trail1Pos.current.x) * 0.1;
      trail1Pos.current.y += (mousePos.current.y - trail1Pos.current.y) * 0.1;
      
      trail2Pos.current.x += (trail1Pos.current.x - trail2Pos.current.x) * 0.08;
      trail2Pos.current.y += (trail1Pos.current.y - trail2Pos.current.y) * 0.08;
      
      trail3Pos.current.x += (trail2Pos.current.x - trail3Pos.current.x) * 0.06;
      trail3Pos.current.y += (trail2Pos.current.y - trail3Pos.current.y) * 0.06;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCurrentPos.current.x}px, ${dotCurrentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCurrentPos.current.x}px, ${ringCurrentPos.current.y}px, 0) translate(-50%, -50%) scale(${isClicked ? 0.8 : 1})`;
      }
      if (trailRef1.current) {
        trailRef1.current.style.transform = `translate3d(${trail1Pos.current.x}px, ${trail1Pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trailRef2.current) {
        trailRef2.current.style.transform = `translate3d(${trail2Pos.current.x}px, ${trail2Pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trailRef3.current) {
        trailRef3.current.style.transform = `translate3d(${trail3Pos.current.x}px, ${trail3Pos.current.y}px, 0) translate(-50%, -50%)`;
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
      {/* Small Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* STAGGERED DATA TRAIL - COMPLETELY UNIQUE */}
      <div
        ref={trailRef1}
        className="fixed top-0 left-0 w-[3px] h-[3px] bg-cyan-400 opacity-40 rounded-full"
      />
      <div
        ref={trailRef2}
        className="fixed top-0 left-0 w-[2.5px] h-[2.5px] bg-purple-400 opacity-30 rounded-full"
      />
      <div
        ref={trailRef3}
        className="fixed top-0 left-0 w-[2px] h-[2px] bg-pink-400 opacity-20 rounded-full"
      />

      {/* Large Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-white/50 transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          width: isHovered ? "48px" : "28px",
          height: isHovered ? "48px" : "28px",
          borderColor: isHovered ? "#06b6d4" : "rgba(255, 255, 255, 0.4)",
          backgroundColor: isHovered ? "rgba(6, 182, 212, 0.1)" : "transparent",
        }}
      >
      </div>
    </div>
  );
}
