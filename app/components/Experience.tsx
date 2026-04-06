"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";

const experiences = [
  {
    id: 1,
    title: "Incoming Data Analyst Intern",
    company: "Tech Solutions Inc.",
    period: "May 2025 – Present",
    description: "Will be working closely with the data engineering team to optimize SQL queries and build interactive dashboards."
  },
  {
    id: 2,
    title: "Data Science Trainee",
    company: "Skill Sprint Bootcamps",
    period: "Jan 2025 – Apr 2025",
    description: "Completed intensive training in machine learning workflows, advanced data wrangling with Pandas, and dashboard design."
  },
  {
    id: 3,
    title: "B.Tech in Information Technology",
    company: "CVM University",
    period: "2023 – Present",
    description: "Focusing on database management systems, applied mathematics, and programming fundamentals. Current GPA: 3.8/4.0."
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="py-32 px-6 container mx-auto max-w-5xl relative"
    >
      <div 
        ref={sectionRef}
        className={`mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="font-display text-[var(--font-h2)] font-bold tracking-tight mb-6 text-white lg:text-purple-400">
          Journey
        </h2>
        <p className="text-white/40 text-[var(--font-body)] max-w-2xl font-light">
          Academic foundations and professional stepping stones.
        </p>
      </div>

      <div className="relative">
        {/* Vertical Timeline Line (Neon Purple Glow) */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-white/[0.05] overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.8)] origin-top"
            style={{ scaleY, height: "100%" }}
          />
        </div>

        <div className="space-y-24 pl-12 md:pl-24 font-sans">
          {experiences.map((exp, i) => (
            <div 
              key={exp.id}
              className={`relative group transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
              style={{ transitionDelay: `${i * 250}ms` }}
            >
              {/* Timeline Neon Purple Point */}
              <div className="absolute left-[-2.45rem] md:left-[-4.95rem] top-3">
                <div className="w-5 h-5 rounded-full bg-[#050508] border-2 border-purple-500 relative z-20 shadow-[0_0_15px_rgba(168,85,247,0.4)]" />
                <motion.div 
                  initial={{ opacity: 0, scale: 1 }}
                  whileInView={{ 
                    opacity: [0.6, 0.2, 0.6], 
                    scale: [1, 2.5, 1],
                  }}
                  viewport={{ once: false }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-purple-500/40 -z-10 blur-sm"
                />
              </div>

              <div className="glass-card rounded-[2.5rem] p-10 md:p-12 border border-white/[0.05] hover:border-purple-500/30 transition-all duration-700 hover:translate-x-3 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 gap-3">
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-none group-hover:text-purple-400 transition-colors duration-500 font-display">
                    {exp.title}
                  </h3>
                  <span className="text-white/20 text-xs md:text-sm font-mono tracking-[0.3em] uppercase lg:group-hover:text-purple-300 transition-colors duration-500">
                    {exp.period}
                  </span>
                </div>
                
                <h4 className="text-xl text-white/50 mb-8 font-medium italic">
                  {exp.company}
                </h4>
                
                <p className="text-white/30 leading-relaxed font-light text-lg md:text-xl group-hover:text-white/50 transition-colors duration-500">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
