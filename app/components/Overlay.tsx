"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Station 1: 0% - 25%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
  const display1 = useTransform(scrollYProgress, (v) => v > 0.28 ? "none" : "flex");

  // Station 2: 35% - 55%
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.58], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.58], [50, 0, 0, -50]);
  const display2 = useTransform(scrollYProgress, (v) => (v < 0.28 || v > 0.6) ? "none" : "flex");

  // Station 3: 65% - 85%
  const opacity3 = useTransform(scrollYProgress, [0.62, 0.7, 0.8, 0.88], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.62, 0.7, 0.8, 0.88], [50, 0, 0, -50]);
  const display3 = useTransform(scrollYProgress, (v) => (v < 0.6 || v > 0.9) ? "none" : "flex");

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center container mx-auto px-6 max-w-6xl">
      
      <motion.div 
        style={{ opacity: opacity1, y: y1, display: display1 as any }}
        className="absolute w-full text-center flex flex-col items-center justify-center"
      >
        <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-xl">
          Heel Soni<span className="text-white/50">.</span>
        </h1>
        <p className="mt-6 text-xl md:text-3xl text-white/80 font-light max-w-2xl drop-shadow-md">
          Data Analyst
        </p>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity2, y: y2, display: display2 as any }}
        className="absolute w-full left-0 md:left-24 text-left flex flex-col items-start justify-center"
      >
        <h2 className="font-display text-4xl md:text-6xl font-medium text-white max-w-2xl drop-shadow-xl leading-tight">
          I turn raw data into <span className="italic text-white/80">decisions.</span>
        </h2>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity3, y: y3, display: display3 as any }}
        className="absolute w-full right-0 md:right-24 text-right flex flex-col items-end justify-center"
      >
        <h2 className="font-display text-4xl md:text-6xl font-medium text-white max-w-2xl drop-shadow-xl leading-tight">
          Bridging the gap between <br/>
          <span className="text-white/60">analytics and strategy.</span>
        </h2>
      </motion.div>

    </div>
  );
}
