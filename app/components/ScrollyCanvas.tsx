'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const TOTAL_FRAMES = 128;
const getFramePath = (i: number) =>
  `/sequence/frame_${String(i).padStart(3, '0')}_delay-0.062s.png`;

export default function ScrollyCanvas() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const rafId = useRef<number>(0);

  // Track 600vh spacer — 0 to 1 as user scrolls through it
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['start start', 'end start'],
  });

  // Canvas slides UP off screen near the very end
  const canvasY = useTransform(scrollYProgress, [0.88, 1.0], ['0vh', '-105vh']);

  // ── TEXT STATION 1: Left side — visible until ~18% page scroll ──────────
  const op1 = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.24], [0, 1, 1, 0]);
  const x1  = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.24], [-30, 0, 0, -30]);

  // ── TEXT STATION 2: Right side — visible at ~29% page scroll ─────────────
  // spacer 0.25→0.30 = fade in, 0.30→0.40 = hold, 0.40→0.44 = fade out
  const op2 = useTransform(scrollYProgress, [0.25, 0.30, 0.40, 0.44], [0, 1, 1, 0]);
  const x2  = useTransform(scrollYProgress, [0.25, 0.30, 0.40, 0.44], [30, 0, 0, 30]);

  // ── TEXT STATION 3: Left side — appears at ~39% page scroll ─────────────
  // station 2 gone at 0.44, station 3 fades in at 0.44 → perfectly sequential
  const op3 = useTransform(scrollYProgress, [0.44, 0.50, 0.79, 0.86], [0, 1, 1, 0]);
  const x3  = useTransform(scrollYProgress, [0.44, 0.50, 0.79, 0.86], [-30, 0, 0, -30]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrame.current);
    };
    window.addEventListener('resize', resize);
    resize();

    function drawFrame(index: number) {
      const img = frames.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      if (!ctx || !canvas) return;
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, w, h);
    }

    // Load frame 0 immediately
    const first = new Image();
    first.src = getFramePath(0);
    frames.current[0] = first;
    if (first.complete && first.naturalWidth > 0) {
      drawFrame(0);
    } else {
      first.onload = () => { frames.current[0] = first; drawFrame(0); };
    }

    // Background batch load
    let i = 1;
    function loadBatch() {
      const end = Math.min(i + 10, TOTAL_FRAMES);
      for (; i < end; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        const capturedI = i;
        img.onload = () => { frames.current[capturedI] = img; };
        frames.current[i] = img;
      }
      if (i < TOTAL_FRAMES) setTimeout(loadBatch, 100);
    }
    setTimeout(loadBatch, 300);

    // 128 frames over the 600vh spacer scroll
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(TOTAL_FRAMES - 1, Math.round(v * (TOTAL_FRAMES - 1)));
      if (idx === currentFrame.current) return;
      currentFrame.current = idx;
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => drawFrame(idx));
    });

    return () => {
      window.removeEventListener('resize', resize);
      unsubscribe();
      cancelAnimationFrame(rafId.current);
    };
  }, [scrollYProgress]);

  return (
    /*
     * 600vh spacer → canvas visible for first ~50% of total page scroll
     * Fixed canvas covers full screen on top (z-5, below navbar z-50)
     * 3 sequential text stations fade in/out at the sides of the portrait
     */
    <div ref={spacerRef} style={{ height: '600vh', position: 'relative' }}>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 30,
          y: canvasY,
        }}
      >
        {/* Canvas — portrait fills viewport */}
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />

        {/* ── STATION 1 — Left side ─────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: op1, x: x1 }}
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-[5%] max-w-[180px] md:max-w-[260px] text-left"
        >
          <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-cyan-400 mb-2">
            01 / IDENTITY
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-syne, sans-serif)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
            className="text-xl md:text-2xl text-white drop-shadow-2xl"
          >
            I am<br />
            <span className="text-cyan-400">Heel Soni.</span><br />
            <span className="text-white text-sm md:text-base font-light tracking-widest normal-case">
              Strategic Data Analyst
            </span>
          </h2>
        </motion.div>

        {/* ── STATION 2 — Right side ────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: op2, x: x2 }}
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-[5%] max-w-[180px] md:max-w-[260px] text-right"
        >
          <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-cyan-400 mb-2">
            02 / PURPOSE
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-syne, sans-serif)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
            className="text-xl md:text-2xl text-white drop-shadow-2xl"
          >
            I turn raw data<br />
            <span className="text-cyan-400">into decisions.</span>
          </h2>
        </motion.div>

        {/* ── STATION 3 — Left side ─────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: op3, x: x3 }}
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-[5%] max-w-[180px] md:max-w-[260px] text-left"
        >
          <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-cyan-400 mb-2">
            03 / METHOD
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-syne, sans-serif)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
            className="text-xl md:text-2xl text-white drop-shadow-2xl"
          >
            Uncovering<br />
            <span className="text-cyan-400">hidden patterns.</span><br />
            <span className="text-white text-sm md:text-base font-light tracking-widest normal-case">
              Bridging analytics &amp; strategy
            </span>
          </h2>
        </motion.div>

      </motion.div>
    </div>
  );
}
