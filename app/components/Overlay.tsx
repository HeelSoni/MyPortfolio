"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Station 1: Left Side (0% - 20%) -> Starts visible
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.22], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15, 0.22], [0, 0, -50]);

  // Station 2: Right Side (26% - 50%)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.50], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.28, 0.44, 0.50], [50, 0, 0, -50]);

  // Station 3: Left Side (55% - 75%)
  const opacity3 = useTransform(scrollYProgress, [0.52, 0.58, 0.71, 0.77], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.52, 0.58, 0.71, 0.77], [50, 0, 0, -50]);

  // Station 4: Right Side (80% - 100%)
  const opacity4 = useTransform(scrollYProgress, [0.77, 0.83, 0.94, 1], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.77, 0.83, 0.94, 1], [50, 0, 0, -50]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none container mx-auto flex items-center">
      
      {/* 1st Statement - Left */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute left-[5%] md:left-[8%] lg:left-[12%] w-[80vw] max-w-[280px] md:max-w-[320px] text-left"
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-xl leading-tight">
          I am Heel Soni.
        </h1>
        <p className="mt-4 text-white/70 text-lg md:text-xl font-light drop-shadow-md">
          A dedicated Data Analyst.
        </p>
      </motion.div>

      {/* 2nd Statement - Right */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute right-[5%] md:right-[8%] lg:right-[12%] w-[80vw] max-w-[280px] md:max-w-[320px] text-right"
      >
        <h2 className="font-display text-3xl md:text-4xl font-medium text-white drop-shadow-xl leading-tight">
          Translating chaos into clarity.
        </h2>
        <p className="mt-4 text-white/70 text-lg font-light drop-shadow-md">
          Parsing monumental datasets to find the invisible.
        </p>
      </motion.div>

      {/* 3rd Statement - Left */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute left-[5%] md:left-[8%] lg:left-[12%] w-[80vw] max-w-[280px] md:max-w-[320px] text-left"
      >
        <h2 className="font-display text-3xl md:text-4xl font-medium text-white drop-shadow-xl leading-tight">
          Uncovering hidden patterns.
        </h2>
        <p className="mt-4 text-white/70 text-lg font-light drop-shadow-md">
          Leveraging advanced analytics & modelling.
        </p>
      </motion.div>

      {/* 4th Statement - Right */}
      <motion.div 
        style={{ opacity: opacity4, y: y4 }}
        className="absolute right-[5%] md:right-[8%] lg:right-[12%] w-[80vw] max-w-[280px] md:max-w-[320px] text-right"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white drop-shadow-xl leading-tight">
          Empowering decisions.
        </h2>
        <p className="mt-4 text-white/80 text-lg font-light drop-shadow-md">
          Delivering strategic certainty based on data.
        </p>
      </motion.div>

    </div>
  );
}
