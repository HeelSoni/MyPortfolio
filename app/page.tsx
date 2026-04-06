import ScrollyCanvas from "./components/ScrollyCanvas";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import About from "./components/About";
import DataBackground from "./components/DataBackground";

export default function Home() {
  return (
    <main className="relative w-full bg-transparent text-white selection:bg-white/20">
      <Navbar />
      
      {/* Hero scrollytelling canvas stays pinned */}
      <ScrollyCanvas />

      {/* Post-Hero content area - TRANSPARENT TO SHOW DATA MESH */}
      <div className="relative z-10 bg-transparent flex flex-col gap-12 md:gap-16">
        <Projects />
        <Skills />
        <Experience />
        <About />
      </div>
    </main>
  );
}
