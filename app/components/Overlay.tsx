"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Station 1: 0% - 25%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
  const visibility1 = useTransform(scrollYProgress, [0, 0.25, 0.26], ["visible", "visible", "hidden"]);

  // Station 2: 35% - 55%
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.58], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.58], [50, 0, 0, -50]);
  const visibility2 = useTransform(scrollYProgress, [0.29, 0.3, 0.58, 0.59], ["hidden", "visible", "visible", "hidden"]);

  // Station 3: 65% - 85%
  const opacity3 = useTransform(scrollYProgress, [0.62, 0.7, 0.8, 0.88], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.62, 0.7, 0.8, 0.88], [50, 0, 0, -50]);
  const visibility3 = useTransform(scrollYProgress, [0.61, 0.62, 0.88, 0.89], ["hidden", "visible", "visible", "hidden"]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center container mx-auto px-6 max-w-6xl">
      
      <motion.div 
        style={{ opacity: opacity1, y: y1, visibility: visibility1 as any }}
        className="absolute w-full text-center flex flex-col items-center justify-center"
      >
        <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-xl">
          I am Heel Soni<span className="text-white/50">.</span>
        </h1>
        <p className="mt-6 text-xl md:text-3xl text-white/80 font-light max-w-2xl drop-shadow-md">
          A Data Analyst
        </p>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity2, y: y2, visibility: visibility2 as any }}
        className="absolute w-full left-0 md:left-24 text-left flex flex-col items-start justify-center"
      >
        <h2 className="font-display text-4xl md:text-6xl font-medium text-white max-w-2xl drop-shadow-xl leading-tight">
          I uncover hidden patterns in <span className="italic text-white/80">complex datasets.</span>
        </h2>
      </motion.div>

      <motion.div 
        style={{ opacity: opacity3, y: y3, visibility: visibility3 as any }}
        className="absolute w-full right-0 md:right-24 text-right flex flex-col items-end justify-center"
      >
        <h2 className="font-display text-4xl md:text-6xl font-medium text-white max-w-2xl drop-shadow-xl leading-tight">
          Empowering decisions with <br/>
          <span className="text-white/60">actionable, strategic insights.</span>
        </h2>
      </motion.div>

    </div>
  );
}
