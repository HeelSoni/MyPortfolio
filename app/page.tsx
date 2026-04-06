import ScrollyCanvas from "./components/ScrollyCanvas";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import About from "./components/About";
import DataBackground from "./components/DataBackground";

export default function Home() {
  return (
    <main className="relative w-full bg-[#050508] text-white selection:bg-white/20">
      <Navbar />
      
      {/* Hero scrollytelling canvas stays pinned */}
      <ScrollyCanvas />

      {/* Post-Hero content area now hosts the DataBackground uniquely */}
      <div className="relative z-20 bg-[#050508] overflow-hidden">
        <DataBackground />
        <Projects />
        <Skills />
        <Experience />
        <About />
      </div>
    </main>
  );
}
