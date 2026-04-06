"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";

const projects = [
  {
    id: 1,
    title: "Customer Churn Prediction",
    description: "Built a machine learning model using Scikit-Learn to predict customer churn with 85% accuracy. Deployed insights into a Power BI dashboard.",
    tags: ["Python", "Scikit-Learn", "Power BI"],
    link: "/projects/customer-churn-prediction",
  },
  {
    id: 2,
    title: "Sales Data Pipeline",
    description: "Engineered an automated data pipeline extracting daily sales data, transforming it via Pandas, and loading it into a MySQL data warehouse.",
    tags: ["Python", "Pandas", "MySQL"],
    link: "/projects/sales-data-pipeline",
  },
  {
    id: 3,
    title: "Market Basket Analysis",
    description: "Applied Apriori algorithm to grocery sales data to identify product associations, leading to optimized product placement recommendations.",
    tags: ["Python", "Data Mining", "Stats"],
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

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // KINETIC MOTION: Mask Reveal + Subtle Skew + Perspective
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const yReveal = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const skewY = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springSkewY = useSpring(skewY, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        rotateX: springRotateX,
        skewY: springSkewY,
        y: yReveal,
        opacity,
        scale,
        perspective: 2000
      }}
      className="group relative h-full"
    >
      <a 
        href={project.link}
        className="flex flex-col h-full bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.1] rounded-[2rem] p-6 md:p-8 transition-all duration-700 hover:shadow-[0_0_60px_rgba(236,72,153,0.2)] hover:translate-y-[-10px] hover:border-pink-500/50 overflow-hidden"
      >
        {/* Neon Gradient Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex justify-between items-start mb-auto relative z-10">
          <div className="max-w-[85%]">
            <span className="text-pink-400 text-[9px] font-mono tracking-[0.4em] uppercase mb-4 block opacity-50">
              Project 0{project.id}
            </span>
            <h3 className="font-display font-bold leading-tight text-2xl md:text-3xl text-white group-hover:text-pink-300 transition-all duration-500">
              {project.title}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-pink-500/40 group-hover:text-white group-hover:scale-110 group-hover:rotate-[45deg] group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <ArrowUpRight size={20} />
          </div>
        </div>

        <div className="relative z-10 mt-6">
          <p className="text-white/30 font-light mb-8 text-base md:text-lg leading-relaxed line-clamp-3 group-hover:text-white/50 transition-colors duration-500">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 text-[9px] font-mono tracking-widest bg-white/[0.02] border border-white/10 rounded-full text-white/40 uppercase group-hover:text-pink-300 group-hover:border-pink-500/30 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-10 px-6 container mx-auto max-w-6xl relative overflow-hidden perspective-normal">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-pink-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="mb-16 text-center md:text-left">
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-cyan-400 text-xs font-mono font-bold tracking-[0.3em] mb-3 block uppercase">SELECTED WORK</span>
          <h2 className="font-display text-[var(--font-h2)] font-bold tracking-tighter mb-3 leading-none text-white">
            My Projects
          </h2>
          <p className="text-white/40 text-[var(--font-body)] max-w-2xl font-light mx-auto md:mx-0">
             Architecting strategic data-driven narratives with technical clarity.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
