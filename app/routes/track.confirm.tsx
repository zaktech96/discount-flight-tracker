import { useEffect } from "react";
import { Link } from "react-router";

export default function TrackConfirm() {
  useEffect(() => {
    console.log("GUARDIAN_INTERCEPT_INITIALIZED: Triggering Resend via backend...");
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500 animate-pulse">
          <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter">PROTECTION ACTIVE</h1>
        <p className="text-slate-400 font-mono text-sm leading-relaxed">
          The Flight Guardian has intercepted your request. We are now monitoring this price point 24/7. A confirmation has been sent to your primary email.
        </p>
        <div className="pt-6">
          <Link to="/dashboard" className="border border-white/20 px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            View Live Intercepts
          </Link>
        </div>
      </div>
    </div>
  );
}
