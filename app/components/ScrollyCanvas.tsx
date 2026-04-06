"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import Overlay from "./Overlay";

const TOTAL_FRAMES = 128;
const getFramePath = (i: number) =>
  `/sequence/frame_${String(i).padStart(3, "0")}_delay-0.062s.png`;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafId = useRef<number>(0);
  const [isEntered, setIsEntered] = useState(false);

  // NATURAL VIDEO FLOW: Target the section naturally (NO Sticky/Pinning)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const loadImages = async () => {
      // 1. Load frame 0 immediately
      const frame0 = new Image();
      frame0.src = getFramePath(0);
      await new Promise((resolve) => {
        frame0.onload = () => {
          draw(frame0);
          resolve(true);
        };
      });
      
      const imgArray: HTMLImageElement[] = new Array(TOTAL_FRAMES);
      imgArray[0] = frame0;
      
      // 2. Load rest in batches
      let i = 1;
      function loadBatch() {
        const end = Math.min(i + 10, TOTAL_FRAMES);
        for (; i < end; i++) {
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => {
            imgArray[i] = img;
          };
          imgArray[i] = img;
        }
        if (i < TOTAL_FRAMES) setTimeout(loadBatch, 100);
      }
      setTimeout(loadBatch, 500);
      
      imagesRef.current = imgArray;
    };

    if (isEntered) {
      loadImages();
    }

    // 3. ZERO-STATE 60fps drawing via scroll progress
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (imagesRef.current.length === 0) return;
      
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(latest * TOTAL_FRAMES)
      );
      
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (imagesRef.current[frameIndex]) {
          cancelAnimationFrame(rafId.current);
          rafId.current = requestAnimationFrame(() => draw(imagesRef.current[frameIndex]));
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
      cancelAnimationFrame(rafId.current);
    };
  }, [isEntered, scrollYProgress]);

  const draw = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // OBJECT-FIT COVER MATH
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
    <div 
      ref={containerRef} 
      className="relative h-[150vh] w-full bg-transparent overflow-visible"
    >
      {/* 
        NATURAL VIDEO HERO:
        1. NO STICKY PINNING (relative positioning).
        2. NO GAP: Section moves naturally down the page.
        3. CINEMATIC SCRUB: 128 frames play as the section enters/leaves the viewport.
      */}
      <div className="relative h-screen w-full overflow-hidden bg-black z-10">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full z-10"
        />
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>

      <AnimatePresence>
        {!isEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4 text-center"
          >
            <h1 className="text-white font-display text-4xl md:text-8xl font-bold mb-12 tracking-tighter uppercase italic drop-shadow-2xl">
              Precision <br />
              <span className="text-cyan-400">Analysis</span>
            </h1>
            <button 
              onClick={() => setIsEntered(true)}
              className="group relative px-16 py-5 bg-white/5 border border-white/20 text-white font-mono uppercase tracking-[0.4em] overflow-hidden transition-all hover:bg-white hover:text-black hover:border-white"
            >
              <span className="relative z-10">Enter Portfolio</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
