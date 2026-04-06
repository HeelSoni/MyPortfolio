import ScrollyCanvas from "./components/ScrollyCanvas";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import About from "./components/About";

export default function Home() {
  return (
    <main className="relative w-full bg-[#050508] text-white selection:bg-white/20">
      <Navbar />
      
      {/* 
        ScrollyCanvas creates the 600vh scroll space. 
        It has a sticky container that stays fixed while the user scrolls through the vertical space. 
        Once the 600vh space is scrolled past, the normal document flow resumes with the rest of the site below.
      */}
      <ScrollyCanvas />

      <div className="relative z-20 bg-[#050508]">
        <Projects />
        <Skills />
        <Experience />
        <About />
      </div>
    </main>
  );
}
