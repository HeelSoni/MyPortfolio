"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Station 1: 0% - 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [1, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2, 0.25], [0, -20, -50]);

  // Station 2: 30% - 50%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.55], [50, 0, 0, -50]);

  // Station 3: 60% - 80%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.85], [50, 0, 0, -50]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center container mx-auto px-6 max-w-6xl">
      
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
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
        style={{ opacity: opacity2, y: y2 }}
        className="absolute w-full left-0 md:left-24 text-left flex flex-col items-start justify-center"
      >
        <h2 className="font-display text-4xl md:text-6xl font-medium text-white max-w-2xl drop-shadow-xl leading-tight">
          I turn raw data into <span className="italic text-white/80">decisions.</span>
        </h2>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
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
