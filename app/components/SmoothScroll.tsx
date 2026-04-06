"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Slightly longer for luxurious damping
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical", 
      gestureOrientation: "vertical", 
      smoothWheel: true, 
      wheelMultiplier: 0.8, // Reduced for buttery-smooth precision
      touchMultiplier: 1.5, 
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Ensure initial scroll position is top on reload
    window.scrollTo(0, 0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div className="relative z-0 antialiased overflow-hidden">{children}</div>;
}
