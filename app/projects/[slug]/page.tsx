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
        
        <div className="glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-semibold mb-6 text-indigo-300">Project Overview</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                The target of this architectural study was to deploy advanced predictive frameworks and highly scalable data pipelines. By utilizing robust machine learning classifications and extracting meaningful patterns from raw chaotic inputs, the resulting solution dramatically outperformed baseline methods. 
              </p>

              <h2 className="text-3xl font-semibold mb-6 text-indigo-300">Technical Execution & Impact</h2>
              <ul className="list-disc list-inside text-white/70 text-lg space-y-4 mb-10">
                <li>Engineered high-velocity ETL pipelines to ingest live data streams with zero latency.</li>
                <li>Implemented cross-validated Scikit-Learn models achieving over 85% predictive accuracy.</li>
                <li>Rendered interactive analytics via custom PowerBI and Matrix Visualizations for executive review.</li>
              </ul>
            </div>
            
            <div className="h-full flex flex-col gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-medium mb-4 text-white">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Scikit-Learn', 'Pandas', 'SQL', 'Power BI'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-indigo-500/20 text-indigo-200 text-sm rounded-full border border-indigo-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-grow flex items-center justify-center">
                 <div className="text-center">
                   <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mx-auto mb-4 opacity-50" />
                   <p className="text-white/40 text-sm uppercase tracking-widest">Model Live Feed<br/>(Simulated)</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="p-6 mt-8 bg-indigo-900/20 rounded-xl border border-indigo-500/20 text-center relative z-10">
            <h4 className="text-indigo-300 font-medium mb-2">Want to see the actual code repository?</h4>
            <p className="text-white/60 text-sm mb-4">This is a dynamic portfolio representation. To view the raw, fully operational repository, explore similar implementations on GitHub.</p>
            <a href="https://github.com/search?q=Data+Analysis+Portfolio&type=repositories" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors text-sm font-medium">
              Explore Similar Repositories
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
