"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-4 flex items-center gap-8 shadow-2xl"
    >
      <div className="font-display font-bold text-lg tracking-tight">HS</div>
      <div className="h-4 w-px bg-white/20" />
      <ul className="flex items-center gap-6 text-sm font-medium text-white/70">
        <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
        <li><a href="#skills" className="hover:text-white transition-colors">Skills</a></li>
        <li><a href="#experience" className="hover:text-white transition-colors">Experience</a></li>
        <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
      </ul>
    </motion.nav>
  );
}
