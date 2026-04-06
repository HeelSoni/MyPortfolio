"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Station 1: Left Side (0% - 20%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.10, 0.18, 0.22], [1, 1, 1, 0], { clamp: true });
  const y1 = useTransform(scrollYProgress, [0, 0.10, 0.18, 0.22], [0, 0, 0, -50], { clamp: true });

  // Station 2: Right Side (26% - 46%)
  const opacity2 = useTransform(scrollYProgress, [0.26, 0.30, 0.42, 0.46], [0, 1, 1, 0], { clamp: true });
  const y2 = useTransform(scrollYProgress, [0.26, 0.30, 0.42, 0.46], [50, 0, 0, -50], { clamp: true });

  // Station 3: Left Side (50% - 70%)
  const opacity3 = useTransform(scrollYProgress, [0.50, 0.54, 0.66, 0.70], [0, 1, 1, 0], { clamp: true });
  const y3 = useTransform(scrollYProgress, [0.50, 0.54, 0.66, 0.70], [50, 0, 0, -50], { clamp: true });

  // Station 4: Right Side (75% - 95%)
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.79, 0.91, 0.95], [0, 1, 1, 0], { clamp: true });
  const y4 = useTransform(scrollYProgress, [0.75, 0.79, 0.91, 0.95], [50, 0, 0, -50], { clamp: true });

  return (
    <div className="absolute inset-0 z-10 pointer-events-none container mx-auto">
      
      {/* 1st Statement - Left */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 left-[2%] md:left-[4%] max-w-[200px] md:max-w-[260px] text-left"
      >
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-tight">
          I am Heel Soni.
        </h1>
        <p className="mt-3 text-white/80 text-sm md:text-base font-medium drop-shadow-md">
          A dedicated Data Analyst.
        </p>
      </motion.div>

      {/* 2nd Statement - Right */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 right-[2%] md:right-[4%] max-w-[200px] md:max-w-[260px] text-right"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-tight">
          Translating chaos into clarity.
        </h2>
        <p className="mt-3 text-white/80 text-sm md:text-base font-medium drop-shadow-md">
          Parsing monumental datasets to find the invisible.
        </p>
      </motion.div>

      {/* 3rd Statement - Left */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 left-[2%] md:left-[4%] max-w-[200px] md:max-w-[260px] text-left"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-tight">
          Uncovering hidden patterns.
        </h2>
        <p className="mt-3 text-white/80 text-sm md:text-base font-medium drop-shadow-md">
          Leveraging advanced analytics & mathematical modeling.
        </p>
      </motion.div>

      {/* 4th Statement - Right */}
      <motion.div 
        style={{ opacity: opacity4, y: y4 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 right-[2%] md:right-[4%] max-w-[200px] md:max-w-[260px] text-right"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] leading-tight">
          Empowering decisions.
        </h2>
        <p className="mt-3 text-white/80 text-sm md:text-base font-medium drop-shadow-md">
          Delivering strategic certainty based on exact data.
        </p>
      </motion.div>

    </div>
  );
}
