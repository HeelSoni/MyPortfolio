"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const TOTAL_FRAMES = 128;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  // NATURAL FLOW: 120vh parent so it scrolls up naturally with the page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Target when it's in view
  });

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];
    
    // Quick load of frame 0 for immediate render
    const initialImg = new Image();
    initialImg.src = `/sequence/frame_000_delay-0.062s.png`;
    initialImg.onload = () => {
      drawOnCanvas(initialImg);
    };
    
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${paddedIndex}_delay-0.062s.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }
    imagesRef.current = imgArray;
    
    const handleResize = () => {
      if (imgArray[currentFrameRef.current]) {
        drawOnCanvas(imgArray[currentFrameRef.current]);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawOnCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set real canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Fill screen logic
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (imagesRef.current.length === 0) return;
    
    // Map the 0-1 progress of the 120vh section to the 128 frames
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(latest * TOTAL_FRAMES)
    );
    
    if (frameIndex !== currentFrameRef.current && imagesRef.current[frameIndex]) {
      currentFrameRef.current = frameIndex;
      requestAnimationFrame(() => {
        drawOnCanvas(imagesRef.current[frameIndex]);
      });
    }
  });

  return (
    <div ref={containerRef} className="relative h-[120vh] w-full bg-transparent overflow-hidden">
      {/* 
        NATURAL SCROLL RESTORATION: Match exact previous intro flow.
        - Section moves UP with the page (no pinning).
        - 120vh depth for a fast, cinematic scrub during the transition.
      */}
      <div className="relative h-full w-full bg-transparent z-10">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full z-10"
        />
        {/* Pass scrollYProgress to Overlay for synchronized text animations */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}
