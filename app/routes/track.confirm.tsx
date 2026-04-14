import { useEffect } from "react";
import { toast } from "sonner";

export default function TrackConfirm() {
  useEffect(() => {
    toast.success("GUARDIAN_INTERCEPT_INITIALIZED: Check your inbox.");
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto border border-blue-500 animate-pulse">
          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a11.735 11.735 0 00-1.29 11.88c.175.47.408.915.69 1.32a11.952 11.952 0 0011.08 6.458 11.952 11.952 0 0011.08-6.458c.282-.405.515-.85.69-1.32a11.735 11.735 0 00-1.29-11.88z" />
          </svg>
        </div>
        <h1 className="text-4xl font-black italic tracking-tighter">PROTECTION ACTIVE</h1>
        <p className="text-slate-400 font-mono text-sm leading-relaxed">
          The Flight Guardian has intercepted your request. We are now monitoring this price point 24/7. A confirmation has been sent to your primary email.
        </p>
        <div className="pt-6">
          <a href="/dashboard" className="border border-white/20 px-8 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            View Live Intercepts
          </a>
        </div>
      </div>
    </div>
  );
}
