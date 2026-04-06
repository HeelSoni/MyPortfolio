'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

const TOTAL_FRAMES = 128;
const getFramePath = (i: number) =>
  `/sequence/frame_${String(i).padStart(3, '0')}_delay-0.062s.png`;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const rafId = useRef<number>(0);

  // Progress tracks 0→1 as user scrolls through the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* ─── Resize canvas to fill viewport exactly ─── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrame.current);
    };
    window.addEventListener('resize', resize);
    resize();

    /* ─── Draw a single frame with object-fit: cover math ─── */
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

    /* ─── Load frame 0 immediately — no blank start ─── */
    const first = new Image();
    first.src = getFramePath(0);
    first.onload = () => {
      frames.current[0] = first;
      drawFrame(0);
    };
    frames.current[0] = first;

    /* ─── Load remaining frames in background batches of 10 ─── */
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

    /* ─── Map scroll → frame index at 60fps ─── */
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(TOTAL_FRAMES - 1, Math.round(v * (TOTAL_FRAMES - 1)));
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
     * SCROLL-VIDEO PATTERN (like Apple product pages):
     *
     * ┌──────────────────────────────────┐  ← 300vh scroll container (normal flow)
     * │  ┌────────────────────────────┐  │
     * │  │ sticky top-0  h-screen     │  │  ← stays pinned WHILE user scrolls 300vh
     * │  │                            │  │     then releases and Skills slides up
     * │  │   <canvas>  covers it all  │  │
     * │  └────────────────────────────┘  │
     * └──────────────────────────────────┘
     * ↓  Skills, Projects, etc. appear here
     */
    <div
      ref={containerRef}
      style={{ height: '300vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
