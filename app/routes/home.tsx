import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans overflow-hidden">
      <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-8 relative z-10">
          <div className="inline-block border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-blue-400 text-xs font-mono uppercase mb-4 animate-pulse">
            System Online: Guardian Radar Active
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Never miss a <span className="text-blue-500">price drop.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-mono">
            Flight Guardian monitors airline pricing databases 24/7. Set your route, define your target price, and let the system intercept the best deals automatically.
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/search" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 font-bold uppercase text-sm tracking-widest transition-all hover:scale-105">
              Initialize Radar
            </Link>
          </div>

          {/* ANIMATED ALERT MOCKUP */}
          <div className="relative mt-16 max-w-md mx-auto pt-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg blur opacity-20 animate-pulse mt-12"></div>
            <div className="relative bg-[#1A1A1A] border border-white/10 p-6 rounded-lg flex items-center gap-5 shadow-2xl animate-[bounce_4s_infinite]">
              <div className="h-12 w-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 shrink-0">
                <svg className="w-6 h-6 animate-ping absolute opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"></circle></svg>
                <svg className="w-6 h-6 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </div>
              <div className="text-left">
                <p className="text-emerald-400 font-bold text-sm tracking-widest uppercase">Target Intercepted</p>
                <p className="text-white font-mono mt-1 text-sm">LHR ➔ JFK dropped to £340</p>
                <p className="text-slate-500 font-mono text-xs mt-1">Alert sent to email via Resend</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="space-y-12 border-t border-white/10 pt-24">
          <h2 className="text-3xl font-bold text-center uppercase tracking-tighter">System Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] border border-white/5 p-8 hover:border-blue-500/30 transition-all">
              <h3 className="text-xl font-bold mb-3 uppercase text-white">Live Data Synchronization</h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed">Powered by Convex, our backend doesn't rely on slow, legacy API polling. Flight prices are synchronized in real-time, meaning you see drops the second they happen.</p>
            </div>
            <div className="bg-[#1A1A1A] border border-white/5 p-8 hover:border-blue-500/30 transition-all">
              <h3 className="text-xl font-bold mb-3 uppercase text-white">Sub-Second Notifications</h3>
              <p className="text-slate-400 text-sm font-mono leading-relaxed">Integrated directly with Resend infrastructure. When your target price is breached, an intercept email is dispatched to your inbox in under 400 milliseconds.</p>
            </div>
          </div>
        </section>

        {/* PROTOCOLS SECTION */}
        <section className="space-y-12 border-t border-white/10 pt-24 pb-24">
          <h2 className="text-3xl font-bold text-center uppercase tracking-tighter">Guardian Protocols</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1A1A1A] border border-white/5 p-8">
              <h3 className="text-xl font-bold mb-3 uppercase text-blue-500">1. Scan Routes</h3>
              <p className="text-slate-400 text-sm font-mono">Search global airline databases for your exact origin, destination, and dates.</p>
            </div>
            <div className="bg-[#1A1A1A] border border-white/5 p-8">
              <h3 className="text-xl font-bold mb-3 uppercase text-blue-500">2. Lock Target</h3>
              <p className="text-slate-400 text-sm font-mono">Set the maximum price you are willing to pay. The Guardian takes over from here.</p>
            </div>
            <div className="bg-[#1A1A1A] border border-white/5 p-8">
              <h3 className="text-xl font-bold mb-3 uppercase text-blue-500">3. Intercept Alert</h3>
              <p className="text-slate-400 text-sm font-mono">Receive an instant secure alert the millisecond the price drops below your threshold.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
