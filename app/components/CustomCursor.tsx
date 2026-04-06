"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  const mousePos = useRef({ x: 0, y: 0 });
  const dotCurrentPos = useRef({ x: 0, y: 0 });
  const ringCurrentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest("a, button, [role='button'], .interactive, .cursor-pointer"));
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

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotCurrentPos.current.x}px, ${dotCurrentPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCurrentPos.current.x}px, ${ringCurrentPos.current.y}px, 0) translate(-50%, -50%)`;
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
  }, []);

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
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* Large Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-white/50 transition-all duration-300 ease-out"
        style={{
          width: isHovered ? "48px" : "28px",
          height: isHovered ? "48px" : "28px",
          borderColor: isHovered ? "#4f46e5" : "rgba(255, 255, 255, 0.4)",
          backgroundColor: isHovered ? "rgba(79, 70, 229, 0.1)" : "transparent",
          transform: `scale(${isClicked ? 0.8 : 1})`,
        }}
      />
    </div>
  );
}
