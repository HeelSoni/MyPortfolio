"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const TOTAL_FRAMES = 128;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  // FIX: Using window scroll directly for absolute sticky-scrubbing stability
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
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
    setImages(imgArray);
    
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

    // Object-fit cover logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio;
      renderHeight = canvas.height;
      offsetX = (canvas.width - renderWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === 0) return;
    
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(latest * TOTAL_FRAMES)
    );
    
    if (frameIndex !== currentFrameRef.current && images[frameIndex]) {
      currentFrameRef.current = frameIndex;
      requestAnimationFrame(() => {
        drawOnCanvas(images[frameIndex]);
      });
    }
  });

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-transparent">
      {/* 
        CRITICAL FIX: Removed intermediate div layers that were breaking sticky. 
        Sticky div must be a direct child of the scrolled parent.
      */}
      <div className="sticky top-0 h-screen w-full overflow-visible bg-transparent z-10">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full z-10"
        />
        {/* Pass scrollYProgress to Overlay for synchronized text animations */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}
