import { Link } from "react-router";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/react-router";

export function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-[#0F172A]/90 backdrop-blur-md p-4 px-8 flex justify-between items-center text-white font-sans fixed top-0 z-50">
      <Link
        to="/"
        className="font-bold text-xl tracking-tighter flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
          🛡️
        </span>{" "}
        FLIGHT-GUARDIAN
      </Link>

      <div className="flex items-center gap-8 text-xs uppercase tracking-widest font-bold">
        <Link to="/search" className="hover:text-blue-400 transition-colors">
          Radar
        </Link>

        <div className="flex items-center gap-6 border-l border-white/10 pl-8">
          <SignedIn>
            <Link
              to="/dashboard"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-slate-300 hover:text-white transition-colors">
                Log In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 transition-all hover:scale-105">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
