"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Station 1: 0% - 20% ("Translating chaos into clarity.")
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], [0, 1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], [20, 0, 0, -20], { clamp: true });

  // Station 2: 30% - 50% ("Uncovering hidden patterns.")
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.30, 0.45, 0.50], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0.25, 0.30, 0.45, 0.50], [20, 0, 0, -20], { clamp: true });

  // Station 3: 60% - 80% ("Empowering decisions.")
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.60, 0.75, 0.80], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0.55, 0.60, 0.75, 0.80], [20, 0, 0, -20], { clamp: true });

  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      
      {/* 1st Station - 0-20%: Translating chaos into clarity. */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 left-[5%] md:left-[10%] max-w-[300px] md:max-w-[500px] text-left"
      >
        <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl leading-[0.9]">
          Translating chaos <br />
          <span className="text-cyan-400">into clarity.</span>
        </h1>
      </motion.div>

      {/* 2nd Station - 30-50%: Uncovering hidden patterns. */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 right-[5%] md:right-[10%] max-w-[300px] md:max-w-[500px] text-right"
      >
        <h2 className="font-display text-3xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight uppercase tracking-widest">
          Uncovering <br />
          <span className="text-cyan-400 font-mono italic underline decoration-cyan-400/30 underline-offset-8">hidden patterns.</span>
        </h2>
      </motion.div>

      {/* 3rd Station - 60-80%: Empowering decisions. */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 left-[5%] md:left-[10%] max-w-[300px] md:max-w-[500px] text-left"
      >
        <h2 className="font-display text-4xl md:text-7xl font-bold text-white drop-shadow-lg leading-tight tracking-tighter">
          Empowering <br />
          <span className="text-cyan-400 font-mono italic">decisions.</span>
        </h2>
      </motion.div>

    </div>
  );
}
