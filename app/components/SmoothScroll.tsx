"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slightly longer duration for "weightier" feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical", 
      gestureOrientation: "vertical", 
      smoothWheel: true, 
      wheelMultiplier: 0.9, // Slightly reduced to avoid jumpiness
      touchMultiplier: 1.5, 
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Synchronize with Framer Motion or other scroll-linked animations
    // lenis.on('scroll', ScrollTrigger.update); 

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div className="relative z-0">{children}</div>;
}
