"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Customer Churn Prediction",
    description: "Built a machine learning model using Scikit-Learn to predict customer churn with 85% accuracy. Deployed insights into a Power BI dashboard for stakeholders.",
    tags: ["Python", "Scikit-Learn", "Power BI", "SQL"],
    link: "/projects/customer-churn-prediction",
  },
  {
    id: 2,
    title: "Sales Data Pipeline",
    description: "Engineered an automated data pipeline extracting daily sales data, transforming it via Pandas, and loading it into a MySQL data warehouse.",
    tags: ["Python", "Pandas", "MySQL", "ETL"],
    link: "/projects/sales-data-pipeline",
  },
  {
    id: 3,
    title: "Market Basket Analysis",
    description: "Applied Apriori algorithm to grocery sales data to identify product associations, leading to optimized product placement recommendations.",
    tags: ["Python", "Data Mining", "Matplotlib"],
    link: "/projects/market-basket-analysis",
  },
  {
    id: 4,
    title: "Interactive Financial Dashboard",
    description: "Designed a comprehensive Power BI dashboard tracking KPIs, revenue trends, and operational costs across multiple regions.",
    tags: ["Power BI", "DAX", "Data Viz"],
    link: "/projects/interactive-financial-dashboard",
  }
];

export default function Projects() {
  return (
    <section id="work" className="py-32 px-6 container mx-auto max-w-6xl relative">
      <motion.div 
        animate={{ x: [0, 80, -80, 0], y: [0, -50, 50, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" 
      />
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl">
          A showcase of data-driven projects focusing on actionable insights and robust engineering.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.a
            href={project.link}
            key={project.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group glass-card rounded-3xl p-8 flex flex-col relative overflow-hidden block transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:border-white/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex justify-between items-start mb-6 z-10 relative">
              <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-white drop-shadow-md">{project.title}</h3>
              <div className="p-2 glass rounded-full bg-white/5 opacity-0 group-hover:opacity-100 group-hover:bg-white group-hover:text-black group-hover:-translate-y-1 group-hover:rotate-12 transition-all duration-300">
                <ArrowUpRight size={20} />
              </div>
            </div>
            
            <p className="text-white/70 mb-8 flex-grow leading-relaxed z-10 relative">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto z-10 relative">
              {project.tags.map((tag, tagIndex) => (
                <motion.span 
                  key={tag}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 + tagIndex * 0.1 }}
                  className="px-3 py-1 text-xs font-medium bg-white/10 rounded-full text-white/90 shadow-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
