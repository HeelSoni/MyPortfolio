"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // LUXURY SMOOTH SCROLL (Jesko Jets Style)
    const lenis = new Lenis({
      duration: 0.8, // Standard responsive duration for perfect scrubbing
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical", 
      gestureOrientation: "vertical", 
      smoothWheel: true, 
      wheelMultiplier: 1, 
      touchMultiplier: 1.5, 
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global Scroll Control for other components
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  return <div className="relative z-0 antialiased w-full overflow-visible">{children}</div>;
}
