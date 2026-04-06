"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Station 1: Left Side (0% - 20%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.22], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.22], [50, 0, 0, -50]);

  // Station 2: Right Side (28% - 48%)
  const opacity2 = useTransform(scrollYProgress, [0.26, 0.32, 0.44, 0.50], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.26, 0.32, 0.44, 0.50], [50, 0, 0, -50]);

  // Station 3: Left Side (55% - 75%)
  const opacity3 = useTransform(scrollYProgress, [0.53, 0.59, 0.71, 0.77], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.53, 0.59, 0.71, 0.77], [50, 0, 0, -50]);

  // Station 4: Right Side (82% - 100%)
  const opacity4 = useTransform(scrollYProgress, [0.80, 0.86, 0.96, 1], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.80, 0.86, 0.96, 1], [50, 0, 0, -50]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none container mx-auto px-6 max-w-7xl">
      
      {/* 1st Statement - Left */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute top-1/2 -translate-y-1/2 left-6 md:left-24 text-left max-w-sm md:max-w-md"
      >
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-xl leading-tight">
          I am Heel Soni.
        </h1>
        <p className="mt-4 text-white/70 text-lg md:text-xl font-light">
          A dedicated Data Analyst.
        </p>
      </motion.div>

      {/* 2nd Statement - Right */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute top-1/2 -translate-y-1/2 right-6 md:right-24 text-right max-w-sm md:max-w-md"
      >
        <h2 className="font-display text-3xl md:text-5xl font-medium text-white drop-shadow-xl leading-tight">
          Translating chaos into clarity.
        </h2>
        <p className="mt-4 text-white/70 text-lg font-light">
          Parsing monumental datasets to find the invisible.
        </p>
      </motion.div>

      {/* 3rd Statement - Left */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute top-1/2 -translate-y-1/2 left-6 md:left-24 text-left max-w-sm md:max-w-md"
      >
        <h2 className="font-display text-3xl md:text-5xl font-medium text-white drop-shadow-xl leading-tight">
          Uncovering hidden patterns.
        </h2>
        <p className="mt-4 text-white/70 text-lg font-light">
          Leveraging advanced analytics & modelling.
        </p>
      </motion.div>

      {/* 4th Statement - Right */}
      <motion.div 
        style={{ opacity: opacity4, y: y4 }}
        className="absolute top-1/2 -translate-y-1/2 right-6 md:right-24 text-right max-w-sm md:max-w-md"
      >
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-xl leading-tight">
          Empowering decisions.
        </h2>
        <p className="mt-4 text-white/80 text-lg font-light">
          Delivering strategic certainty based on data.
        </p>
      </motion.div>

    </div>
  );
}
