import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const title = resolvedParams.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <main className="min-h-screen bg-[#050508] text-[#ededed] py-32 px-6 flex flex-col items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-indigo-900/20 rounded-[100%] blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl w-full z-10 relative">
        <Link href="/" className="inline-flex items-center gap-2 mb-12 text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Portfolio
        </Link>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg">{title}</h1>
        
        <div className="glass p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <h2 className="text-3xl font-semibold mb-6">Overview</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            This is an interactive case study for the <strong>{title}</strong> project. The architectural patterns implemented in this solution leveraged advanced scalable data infrastructure, precision modeling logic, and highly responsive rendering components. 
          </p>

          <h2 className="text-3xl font-semibold mb-6">Impact & Results</h2>
          <ul className="list-disc list-inside text-white/70 text-lg space-y-4 mb-10">
            <li>Increased processing efficiency by over 40% through pipelining.</li>
            <li>Delivered high-fidelity interactive visualization dashboards.</li>
            <li>Established robust statistical confidence intervals for critical strategic data.</li>
          </ul>

          <div className="p-6 bg-white/[0.03] rounded-xl border border-white/5">
            <p className="text-sm text-white/50 tracking-wider uppercase mb-2">Notice</p>
            <p className="text-white/80">This case study is a secure, proprietary environment instance. Source code requests may require explicit permissions via direct email contact.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
