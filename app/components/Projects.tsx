"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import ScrambleText from "./ScrambleText";

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

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // SUBTLE 3D Perspective Rotation on Scroll (Max 8 degrees for professionalism)
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        rotateX: springRotateX,
        opacity,
        scale,
        perspective: 1500
      }}
      className="group relative h-full"
    >
      <a 
        href={project.link}
        className="flex flex-col h-full bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] p-8 md:p-10 transition-all duration-700 hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] hover:translate-y-[-8px] hover:border-indigo-500/40 overflow-hidden min-h-[420px]"
      >
        {/* Neon Indigo Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="flex justify-between items-start mb-auto relative z-10">
          <div className="max-w-[80%]">
            <span className="text-indigo-400 text-[10px] font-mono tracking-[0.4em] uppercase mb-5 block opacity-50">
              Project 0{project.id}
            </span>
            <h3 className="font-display font-bold leading-tight text-3xl md:text-4xl text-white group-hover:neon-text-indigo transition-all duration-500">
              {project.title}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-[45deg] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]">
            <ArrowUpRight size={24} />
          </div>
        </div>

        <div className="relative z-10 mt-8">
          <p className="text-white/40 font-light mb-10 text-lg md:text-xl leading-relaxed line-clamp-3 group-hover:text-white/60 transition-colors duration-500">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-4 py-1.5 text-[10px] font-mono tracking-widest bg-white/[0.03] border border-white/10 rounded-full text-white/50 uppercase group-hover:text-indigo-300 group-hover:border-indigo-500/40 transition-all duration-300"
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
    <section id="work" className="py-32 px-6 container mx-auto max-w-7xl relative overflow-hidden perspective-normal">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="mb-20 text-center md:text-left">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-indigo-400 text-xs font-mono tracking-[0.5em] uppercase mb-4 block">Selected Works</span>
          <h2 className="font-display text-[var(--font-h1)] font-bold tracking-tighter mb-6 leading-none text-white">
            <ScrambleText text="Selected Works" />
          </h2>
          <p className="text-white/40 text-[var(--font-body)] max-w-2xl font-light mx-auto md:mx-0">
            Architecting data-driven solutions to solve complex business narratives with precision.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
