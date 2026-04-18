import { Link } from "react-router";

export function Navbar() {
  // NOTE: Replace this mock state with your actual auth hook
  // (e.g., const { isAuthenticated } = useConvexAuth();)
  const isAuthenticated = false;

  return (
    <nav className="w-full border-b border-white/10 bg-[#0F172A]/90 backdrop-blur-md p-4 px-8 flex justify-between items-center text-white font-sans fixed top-0 z-50">
      {/* BRANDING */}
      <Link
        to="/"
        className="font-bold text-xl tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
          🛡️
        </span>{" "}
        FLIGHT-GUARDIAN
      </Link>

      {/* NAVIGATION & AUTH */}
      <div className="flex items-center gap-8 text-xs uppercase tracking-widest font-bold">
        <Link to="/search" className="hover:text-blue-400 transition-colors">
          Radar
        </Link>

        <div className="flex items-center gap-6 border-l border-white/10 pl-8">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-blue-400 hover:text-blue-300 transition-colors shadow-[0_0_15px_rgba(59,130,246,0)] hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                Dashboard
              </Link>
              <button className="text-slate-400 hover:text-white transition-colors">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
