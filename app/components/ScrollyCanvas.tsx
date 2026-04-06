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
   * 400vh container + sticky canvas:
   * -- All 128 frames play over 400vh of scroll
   * -- At ~50% total page scroll, canvas releases & Skills appears
   * -- No blank gap between hero and content
   */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
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

    // Load frame 0 immediately — no blank screen on load
    const first = new Image();
    first.src = getFramePath(0);
    frames.current[0] = first;
    if (first.complete && first.naturalWidth > 0) {
      drawFrame(0);
    } else {
      first.onload = () => { frames.current[0] = first; drawFrame(0); };
    }

    // Load remaining frames in batches of 10 in background
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

    // Scroll → frame index, drawn at 60fps
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
     * 400vh outer — scroll space for all 128 frames
     * sticky h-screen inner — canvas stays fullscreen during that scroll
     * Skills / Projects appear only AFTER this 400vh zone is done
     */
    <div
      ref={containerRef}
      style={{ height: '400vh', position: 'relative' }}
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
