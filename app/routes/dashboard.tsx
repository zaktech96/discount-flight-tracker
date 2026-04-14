import { Link } from "react-router";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-8 font-sans pt-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-white/10 pb-6 mt-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase">Active Intercepts</h1>
            <p className="text-slate-400 font-mono text-sm">MONITORING_YOUR_TARGETS...</p>
          </div>
          <Link to="/search" className="border border-blue-500 text-blue-400 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-blue-500/10">
            + New Target
          </Link>
        </header>

        <div className="bg-[#1A1A1A] border border-white/5 p-8 text-center space-y-4">
          <p className="text-slate-400 font-mono">No active intercepts found.</p>
          <Link to="/search" className="inline-block bg-blue-600 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-blue-500">
            Initialize a Search
          </Link>
        </div>
      </div>
    </div>
  );
}
