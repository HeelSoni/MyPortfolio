"use client";

import { motion } from "framer-motion";

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
  return (
    <section id="skills" className="py-32 px-6 container mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2 className="font-display text-[clamp(2.5rem,8vw,4rem)] font-bold tracking-tight mb-4 text-white">
          Capabilities
        </h2>
        <p className="text-white/40 text-lg md:text-xl max-w-2xl font-light">
          A multi-disciplinary toolkit engineered for precision and strategic clarity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.2,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className="glass-card rounded-[2.5rem] p-10 shimmer-bg relative group overflow-hidden"
          >
            <h3 className="text-xl font-bold mb-8 text-white tracking-tight relative z-10">
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
