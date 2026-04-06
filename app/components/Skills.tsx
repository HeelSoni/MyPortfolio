"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";

const skillCategories = [
  {
    prefix: "Data",
    title: "Engineering",
    skills: ["Python", "Pandas", "SQL", "MySQL", "APIs", "ETL"]
  },
  {
    prefix: "Stats",
    title: "Analysis",
    skills: ["NumPy", "Scikit", "Mining", "A/B Testing", "Wrangling"]
  },
  {
    prefix: "Insights",
    title: "Visualization",
    skills: ["Power BI", "DAX", "Excel", "Tableau", "Matplotlib"]
  }
];

function SkillCard({ category, index, isVisible }: { category: typeof skillCategories[0], index: number, isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseRotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
  const mouseRotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: mouseRotateX, rotateY: mouseRotateY, scale: scrollScale, filter: `blur(${blur}px)`, perspective: 1200 }}
      className={`glass-card rounded-[2.5rem] p-10 md:p-12 shimmer-neon relative group overflow-hidden border border-white/[0.1] hover:border-cyan-500/50 hover:shadow-[0_0_60px_rgba(6,182,212,0.2)] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-10 relative z-10">
        <span className="text-xs font-mono tracking-[0.4em] uppercase text-cyan-400 opacity-60 mb-2 block">{category.prefix}</span>
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tighter font-display uppercase group-hover:neon-text-cyan transition-colors duration-500">
          {category.title}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-y-5 gap-x-4 relative z-10">
        {category.skills.map((skill, j) => (
          <motion.div 
            key={skill}
            initial={{ opacity: 0, x: -10 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + j * 0.05 + 0.3 }}
            className="flex items-center gap-2.5 group/item cursor-default"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-30 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300" />
            <span className="text-white/40 text-sm md:text-base font-medium group-hover/item:text-white transition-colors duration-300">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="capabilities" ref={sectionRef} className="py-24 px-6 container mx-auto max-w-7xl perspective-normal">
      <div className="mb-20 text-center md:text-left">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 text-xs font-mono tracking-[0.5em] uppercase mb-4 block">Core Competencies</span>
          <h2 className="font-display text-[var(--font-h1)] font-bold tracking-tighter mb-6 text-white group-hover:neon-text-cyan">
             <ScrambleText text="Capabilities" />
          </h2>
          <p className="text-white/30 text-[var(--font-body)] max-w-2xl font-light mx-auto md:mx-0">
             Analytical frameworks engineered for high-performance strategic clarity.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, i) => (
          <SkillCard 
            key={category.title} 
            category={category} 
            index={i} 
            isVisible={isVisible} 
          />
        ))}
      </div>
    </section>
  );
}
