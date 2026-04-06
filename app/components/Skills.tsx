"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";

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

export default function Skills() {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" ref={sectionRef} className="py-32 px-6 container mx-auto max-w-7xl">
      <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="font-display text-[var(--font-h2)] font-bold tracking-tight mb-4 text-white">
          Capabilities
        </h2>
        <p className="text-white/40 text-[var(--font-body)] max-w-2xl font-light mb-16">
          A multi-disciplinary toolkit engineered for precision and strategic clarity.
        </p>
      </div>

      <div className="portfolio-grid">
        {skillCategories.map((category, i) => (
          <div
            key={category.title}
            className={`glass-card rounded-[2.5rem] p-10 shimmer-bg relative group overflow-hidden transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-x-0 blur-0" 
                : "opacity-0 -translate-x-10 blur-[4px]"
            }`}
            style={{ transitionDelay: `${i * 200}ms` }}
          >
            <h3 className="text-xl font-bold mb-8 text-white tracking-tight relative z-10 font-display">
              {category.title}
            </h3>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {category.skills.map((skill, j) => (
                <div 
                  key={skill}
                  className="flex items-center gap-2 group/item"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-40 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300" />
                  <span className="text-white/50 text-sm font-medium group-hover/item:text-white transition-colors duration-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
