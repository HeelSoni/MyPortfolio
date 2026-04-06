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

  /*
   * offset: ['start start', 'end start']
   * 0 = top of container at top of viewport (page load — frame 0 visible)
   * 1 = bottom of container at top of viewport (canvas fully scrolled away)
   *
   * Result: all 128 frames play as the 100vh canvas scrolls naturally
   * off screen. Skills section appears immediately after.
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

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

    // Load frame 0 immediately — fullscreen on page load
    const first = new Image();
    first.src = getFramePath(0);
    frames.current[0] = first;
    if (first.complete && first.naturalWidth > 0) {
      drawFrame(0);
    } else {
      first.onload = () => { frames.current[0] = first; drawFrame(0); };
    }

    // Load remaining frames in batches of 10 in the background
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

    // Scroll drives frames — 60fps via requestAnimationFrame
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
     * SCROLL-VIDEO HERO — No sticky, no gap:
     *
     * 100vh container (normal page flow, not sticky)
     *   └── 100vh canvas fills it exactly
     *
     * On load     → frame 0 shows fullscreen (like video paused on first frame)
     * On scroll   → frames advance 0→127 as canvas moves up (like video playing)
     * After 100vh → canvas gone, Skills section appears directly below
     */
    <div
      ref={containerRef}
      style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
