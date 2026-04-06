"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages & Libraries",
    skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "SQL", "DAX"]
  },
  {
    title: "Tools & Platforms",
    skills: ["MySQL", "Power BI", "GitHub", "Excel", "Kaggle", "HackerRank"]
  },
  {
    title: "Analytics & Methods",
    skills: ["Data Mining", "Data Viz", "Data Wrangling", "A/B Testing", "ETL Pipelines"]
  }
];

function SkillCard({ category, index, isVisible }: { category: typeof skillCategories[0], index: number, isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="glass-card rounded-[2.5rem] p-10 shimmer-bg relative group overflow-hidden border border-white/[0.08] hover:border-indigo-500/30 transition-colors duration-500"
    >
      <h3 className="text-xl font-bold mb-10 text-white tracking-tight relative z-10 font-display">
        {category.title}
      </h3>
      
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10">
        {category.skills.map((skill, j) => (
          <motion.div 
            key={skill}
            initial={{ opacity: 0, x: -10 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + j * 0.05 + 0.4 }}
            className="flex items-center gap-3 group/item cursor-default"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-40 group-hover/item:opacity-100 group-hover/item:scale-125 group-hover/item:shadow-[0_0_10px_#4f46e5] transition-all duration-300" />
            <span className="text-white/40 text-sm font-medium group-hover/item:text-white transition-colors duration-300">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Floating Glow Follow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function Skills() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" ref={sectionRef} className="py-32 px-6 container mx-auto max-w-7xl">
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-[var(--font-h2)] font-bold tracking-tight mb-4 text-white">
            Capabilities
          </h2>
          <p className="text-white/30 text-[var(--font-body)] max-w-2xl font-light">
            A multi-disciplinary toolkit engineered for precision and strategic clarity.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
