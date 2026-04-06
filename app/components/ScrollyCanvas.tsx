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

  /*
   * Track the 300vh spacer scroll — 0 when spacer top is at viewport top,
   * 1 when spacer bottom passes the viewport top.
   * All 128 frames play over this 300vh zone.
   * Canvas slides OUT at 85-100% of spacer scroll (last 45vh).
   */
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['start start', 'end start'],
  });

  // Canvas slides UP and out of view at the end of the spacer scroll
  const canvasY = useTransform(scrollYProgress, [0.85, 1.0], ['0vh', '-105vh']);

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

    // Frame 0 loads immediately — no blank screen on init
    const first = new Image();
    first.src = getFramePath(0);
    frames.current[0] = first;
    if (first.complete && first.naturalWidth > 0) {
      drawFrame(0);
    } else {
      first.onload = () => { frames.current[0] = first; drawFrame(0); };
    }

    // Background batch load remaining 127 frames
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

    // 128 frames advance over the full 300vh spacer scroll
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
     * 300vh spacer div (normal page flow)
     * Fixed canvas stays fullscreen on top WHILE in the spacer zone.
     *
     * Math: 300vh spacer + ~300vh content = ~600vh total page
     * => Canvas visible for first ~50% of total page scroll
     * => At 50%, canvas slides up and Skills appears underneath
     */
    <div ref={spacerRef} style={{ height: '300vh', position: 'relative' }}>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 5,
          y: canvasY,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </motion.div>
    </div>
  );
}
