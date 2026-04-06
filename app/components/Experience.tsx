"use client";

import { motion } from "framer-motion";

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
    company: "XYZ University",
    period: "2023 – Present",
    description: "Focusing on database management systems, applied mathematics, and programming fundamentals. Current GPA: 3.8/4.0."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Journey</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Academic foundations and professional stepping stones.
        </p>
      </motion.div>

      <div className="relative border-l border-white/10 md:ml-8 ml-4 pl-8 md:pl-16 py-4 space-y-16">
        
        {/* Animated line drawing down the timeline */}
        <motion.div 
          className="absolute top-0 left-[-1px] w-[2px] bg-white origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "anticipate" }}
          style={{ height: "100%" }}
        />

        {experiences.map((exp, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.2, duration: 0.7, ease: "easeOut" }}
            whileHover="hover"
            className="relative group cursor-default"
          >
            {/* Timeline Dot */}
            <motion.div 
              variants={{
                hover: { scale: 1.5, boxShadow: "0 0 15px 4px rgba(255,255,255,0.6)" }
              }}
              transition={{ duration: 0.3 }}
              className="absolute w-4 h-4 rounded-full bg-white -left-[2.1rem] md:-left-[4.6rem] top-1.5 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10" 
            />
            
            <motion.div
               variants={{
                 hover: { x: 10 }
               }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               className="p-4 -m-4 rounded-xl transition-colors duration-300 group-hover:bg-white/5"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-white drop-shadow-sm">{exp.title}</h3>
                <span className="text-white/50 text-sm font-mono tracking-wider transition-colors duration-300 group-hover:text-white/80">{exp.period}</span>
              </div>
              
              <h4 className="text-lg text-white/70 mb-4 font-medium transition-colors duration-300 group-hover:text-white/90">{exp.company}</h4>
              <p className="text-white/60 leading-relaxed max-w-2xl transition-colors duration-300 group-hover:text-white/80">
                {exp.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
