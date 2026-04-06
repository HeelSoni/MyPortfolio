"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Station 1: Center (0% -> ~20%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], [0, 1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.20], [20, 0, 0, -20], { clamp: true });

  // Station 2: Left Side (30% -> ~50%)
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.30, 0.45, 0.50], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0.25, 0.30, 0.45, 0.50], [20, 0, 0, -20], { clamp: true });

  // Station 3: Right Side (60% -> ~80%)
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.60, 0.75, 0.80], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0.55, 0.60, 0.75, 0.80], [20, 0, 0, -20], { clamp: true });

  return (
    <div className="absolute inset-0 z-10 pointer-events-none container mx-auto">
      
      {/* 1st Station - Center (0%) */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl leading-tight">
          Heel Soni. <br />
          <span className="text-cyan-400">Data Analyst.</span>
        </h1>
      </motion.div>

      {/* 2nd Station - Left (30%) */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute top-1/2 -translate-y-1/2 left-[5%] md:left-[10%] max-w-[300px] md:max-w-[400px] text-left"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">
          I turn raw data <br />
          <span className="text-cyan-400 font-mono">into decisions.</span>
        </h2>
      </motion.div>

      {/* 3rd Station - Right (60%) */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute top-1/2 -translate-y-1/2 right-[5%] md:right-[10%] max-w-[300px] md:max-w-[400px] text-right"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">
          Bridging analytics <br />
          <span className="text-cyan-400 font-mono">& strategy.</span>
        </h2>
      </motion.div>

    </div>
  );
}
