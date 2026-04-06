"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden border-t border-white/10 mt-16">
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent z-0" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">Let's build together.</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed">
            Whether you have a complex dataset that needs decoding, or a business problem looking for a data-driven solution, I'm ready to help.
          </p>
        </motion.div>

        <motion.div 
          className="flex gap-6"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 10 }}
        >
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.15, y: -5, boxShadow: "0 10px 25px -5px rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="p-4 glass rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center relative overflow-hidden group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </motion.a>
          
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.15, y: -5, boxShadow: "0 10px 25px -5px rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="p-4 glass rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center relative overflow-hidden group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </motion.a>
          
          <motion.a 
            href="mailto:contact@heelsoni.com" 
            whileHover={{ scale: 1.15, y: -5, boxShadow: "0 10px 25px -5px rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="p-4 glass rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center relative overflow-hidden group"
          >
            <Mail size={24} className="transition-transform duration-300 group-hover:scale-110" />
          </motion.a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-32 text-white/30 text-sm font-mono"
        >
          © {new Date().getFullYear()} Heel Soni. All rights reserved.
        </motion.div>
      </div>
    </section>
  );
}
