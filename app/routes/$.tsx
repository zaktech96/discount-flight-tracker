import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center p-8 font-sans overflow-hidden relative">

      {/* BACKGROUND RADAR EFFECT */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-blue-500/30 absolute animate-[ping_3s_linear_infinite]"></div>
        <div className="w-[600px] h-[600px] rounded-full border border-blue-500/20 absolute"></div>
        <div className="w-[400px] h-[400px] rounded-full border border-blue-500/40 absolute"></div>
      </div>

      {/* CONTENT FOREGROUND */}
      <div className="relative z-10 text-center space-y-6 max-w-lg">
        <div className="text-blue-500 font-mono text-xl tracking-[0.5em] uppercase mb-4 animate-pulse">
          Error 404
        </div>

        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
          SIGNAL LOST
        </h1>

        <p className="text-slate-400 font-mono text-sm leading-relaxed pb-8">
          The coordinates you provided do not exist in our database. The target may have been rerouted, or the tracking URL is invalid.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/search"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 font-bold uppercase text-xs tracking-widest transition-all hover:scale-105 flex items-center justify-center"
          >
            Re-Initialize Radar
          </Link>
          <Link
            to="/"
            className="border border-white/20 hover:border-white/40 bg-transparent px-8 py-3 font-bold uppercase text-xs tracking-widest transition-all text-slate-300 hover:text-white flex items-center justify-center"
          >
            Return to Base
          </Link>
        </div>
      </div>

    </div>
  );
}
