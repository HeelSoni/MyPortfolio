"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Station 1: Far Left (0% - 22%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.05, 0.17, 0.22], [0, 1, 1, 0], { clamp: true });
  const x1 = useTransform(scrollYProgress, [0, 0.05, 0.17, 0.22], [-20, 0, 0, -20], { clamp: true });

  // Station 2: Far Right (26% - 46%)
  const opacity2 = useTransform(scrollYProgress, [0.26, 0.31, 0.41, 0.46], [0, 1, 1, 0], { clamp: true });
  const x2 = useTransform(scrollYProgress, [0.26, 0.31, 0.41, 0.46], [20, 0, 0, 20], { clamp: true });

  // Station 3: Far Left (50% - 70%)
  const opacity3 = useTransform(scrollYProgress, [0.50, 0.55, 0.65, 0.70], [0, 1, 1, 0], { clamp: true });
  const x3 = useTransform(scrollYProgress, [0.50, 0.55, 0.65, 0.70], [-20, 0, 0, -20], { clamp: true });

  // Station 4: Far Right (75% - 95%)
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.80, 0.90, 0.95], [0, 1, 1, 0], { clamp: true });
  const x4 = useTransform(scrollYProgress, [0.75, 0.80, 0.90, 0.95], [20, 0, 0, 20], { clamp: true });

  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      
      {/* 1st Station - Far Left: EXACT BRIEF MATCH */}
      <motion.div 
        style={{ opacity: opacity1, x: x1 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 left-[4%] md:left-[6%] max-w-[200px] md:max-w-[420px] text-left"
      >
        <h1 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-white drop-shadow-2xl leading-[0.9]">
          I AM HEEL SONI. <br />
          <span className="text-cyan-400">STRATEGIC DATA ANALYSIS.</span>
        </h1>
      </motion.div>

      {/* 2nd Station - Far Right */}
      <motion.div 
        style={{ opacity: opacity2, x: x2 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 right-[4%] md:right-[6%] max-w-[200px] md:max-w-[420px] text-right"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">
          Visualizing <br />
          <span className="text-cyan-400 font-mono italic underline decoration-cyan-400/30 underline-offset-8">Complexity.</span>
        </h2>
      </motion.div>

      {/* 3rd Station - Far Left */}
      <motion.div 
        style={{ opacity: opacity3, x: x3 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 left-[4%] md:left-[6%] max-w-[200px] md:max-w-[420px] text-left"
      >
        <h2 className="font-display text-3xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
          Precision-Driven <br />
          <span className="text-cyan-400 font-mono italic">Analytics.</span>
        </h2>
      </motion.div>

      {/* 4th Station - Far Right */}
      <motion.div 
        style={{ opacity: opacity4, x: x4 }}
        className="absolute top-[40%] md:top-1/2 -translate-y-1/2 right-[4%] md:right-[6%] max-w-[200px] md:max-w-[420px] text-right"
      >
        <h2 className="font-display text-3xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
          Bridging Analytics <br />
          <span className="text-cyan-400 font-mono italic decoration-cyan-400/30 underline-offset-8 underline leading-none">
            & Strategy.
          </span>
        </h2>
      </motion.div>

    </div>
  );
}
