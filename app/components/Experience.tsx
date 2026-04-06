"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";

const experiences = [
  {
    title: "Incoming Data Analyst Intern",
    company: "Tech Solutions Inc.",
    period: "May 2025 – Present",
    description: "Will be working closely with the data engineering team to optimize SQL queries and build interactive dashboards."
  },
  {
    title: "Data Science Trainee",
    company: "Skill Sprint Bootcamps",
    period: "Jan 2025 – Apr 2025",
    description: "Completed intensive training in machine learning workflows, advanced data wrangling with Pandas, and dashboard design."
  },
  {
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
        className={`mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h2 className="font-display text-[var(--font-h2)] font-bold tracking-tight mb-4 text-white">
          Journey
        </h2>
        <p className="text-white/40 text-[var(--font-body)] max-w-2xl font-light">
          Academic foundations and professional stepping stones.
        </p>
      </div>

      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-white/10 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] origin-top"
            style={{ scaleY, height: "100%" }}
          />
        </div>

        <div className="space-y-16 pl-12 md:pl-24 font-sans">
          {experiences.map((exp, i) => (
            <div 
              key={i}
              className={`relative group transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              {/* Timeline Dot Marker */}
              <div className="absolute left-[-2.4rem] md:left-[-4.9rem] top-2">
                <div className="w-4 h-4 rounded-full bg-[#050508] border-2 border-indigo-500 relative z-10" />
                <motion.div 
                  initial={{ opacity: 0, scale: 1 }}
                  whileInView={{ opacity: [0.5, 0, 0.5], scale: [1, 2, 1] }}
                  viewport={{ once: false }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-indigo-500/50 -z-0"
                />
              </div>

              <div className="glass-card rounded-[2rem] p-8 md:p-10 border border-white/5 hover:border-indigo-500/20 transition-all duration-500 hover:translate-x-2">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-none group-hover:text-indigo-400 transition-colors duration-300 font-display">
                    {exp.title}
                  </h3>
                  <span className="text-white/30 text-sm font-mono tracking-widest uppercase">
                    {exp.period}
                  </span>
                </div>
                
                <h4 className="text-lg text-white/60 mb-6 font-medium">
                  {exp.company}
                </h4>
                
                <p className="text-white/40 leading-relaxed font-light text-base md:text-lg">
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
