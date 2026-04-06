"use client";

import { motion } from "framer-motion";

const skills = [
  "SQL", "MySQL", "Python", "Pandas", "NumPy", "Power BI", 
  "Scikit-Learn", "Data Mining", "Data Visualization", "GitHub", 
  "Kaggle", "HackerRank", "Excel", "Data Wrangling", "A/B Testing"
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row gap-16">
        
        <div className="md:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Capabilities</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Equipped with a versatile analytical toolkit, I translate complex datasets into clear, strategic narratives. Constantly learning and adapting to the modern data ecosystem.
            </p>
          </motion.div>
        </div>

        <div className="md:w-2/3 flex flex-wrap gap-3 content-start">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 120, damping: 10 }}
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: "rgba(255,255,255,0.25)",
                borderColor: "rgba(255,255,255,0.4)",
                y: -5,
                boxShadow: "0 10px 20px -10px rgba(255,255,255,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 glass rounded-full text-sm font-medium tracking-wide border border-white/10 cursor-default transition-colors duration-300 text-white/90 hover:text-white"
            >
              {skill}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
