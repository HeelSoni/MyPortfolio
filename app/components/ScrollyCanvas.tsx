"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import Overlay from "./Overlay";

const TOTAL_FRAMES = 128;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  // PRECISION TECHNICAL BRIEF: 600vh parent + sticky h-screen canvas
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const loadImages = async () => {
      // 1. Load frame 0 immediately
      const frame0 = new Image();
      frame0.src = `/sequence/frame_000_delay-0.062s.png`;
      await new Promise((resolve) => {
        frame0.onload = () => {
          draw(frame0);
          resolve(true);
        };
      });
      
      const imgArray: HTMLImageElement[] = new Array(TOTAL_FRAMES);
      imgArray[0] = frame0;
      
      // 2. Load remaining frames in background batches of 10
      const BATCH_SIZE = 10;
      for (let i = 1; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        const batchPromise = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
          const img = new Image();
          const paddedIndex = j.toString().padStart(3, "0");
          img.src = `/sequence/frame_${paddedIndex}_delay-0.062s.png`;
          const promise = new Promise((resolve) => {
            img.onload = () => {
              imgArray[j] = img;
              resolve(true);
            };
            img.onerror = resolve; // Continue on error
          });
          batchPromise.push(promise);
        }
        await Promise.all(batchPromise);
      }
      
      imagesRef.current = imgArray;
      setLoaded(true);
    };

    loadImages();

    // 3. Precision frame updates via scroll progress (Zero React State)
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (imagesRef.current.length === 0) return;
      
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(latest * TOTAL_FRAMES)
      );
      
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (imagesRef.current[frameIndex]) {
          requestAnimationFrame(() => draw(imagesRef.current[frameIndex]));
        }
      }
    });

    const handleResize = () => {
      if (imagesRef.current[currentFrameRef.current]) {
        draw(imagesRef.current[currentFrameRef.current]);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress]);

  const draw = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set real canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ABSOLUTE OBJECT-FIT COVER MATH
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

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-transparent">
      {/* 
        PRECISION TECHNICAL RESTORATION:
        - 600vh parent
        - Sticky h-screen canvas (No-jank scrubbing)
        - Sequential Text Overlay on z-20
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
