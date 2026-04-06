"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 h-[30vh] w-[2px] bg-white/5 z-[60] hidden lg:block">
      {/* Background Track */}
      <div className="absolute inset-0 bg-white/10 rounded-full" />
      
      {/* Animated Progress Fill */}
      <motion.div 
        style={{ scaleY }}
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-full origin-top shadow-[0_0_20px_rgba(99,102,241,0.6)]"
      />

      {/* Numerical Data Label */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-white/40 vertical-text whitespace-nowrap">
        DATA_STREAM
      </div>

      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 font-mono text-xs font-bold text-white tracking-widest flex flex-col items-center">
        <span className="text-[10px] text-indigo-400 mb-1">PROG</span>
        <div className="flex items-baseline">
          {percent}
          <span className="text-[8px] ml-0.5 opacity-50">%</span>
        </div>
      </div>

      {/* Side Decorative Nodes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
    </div>
  );
}
