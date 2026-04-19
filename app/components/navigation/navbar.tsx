import { Link } from "react-router";
import { Plane } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/react-router";

export function Navbar() {
  return (
    <nav className="w-full border-b border-white/60 bg-white/70 backdrop-blur-xl backdrop-saturate-150 fixed top-0 z-50 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_12px_-6px_rgba(14,165,233,0.15)]">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 text-slate-900">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white">
            <Plane className="h-4 w-4" />
          </span>
          Flight Guardian
        </Link>

        <div className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
          <Link
            to="/search"
            className="text-slate-600 hover:text-slate-900 transition-colors px-2"
          >
            Search flights
          </Link>

          <SignedIn>
            <Link
              to="/dashboard"
              className="text-slate-600 hover:text-slate-900 transition-colors px-2"
            >
              My flights
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-slate-600 hover:text-slate-900 transition-colors px-2">
                Log in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="glass-button rounded-full bg-sky-600 text-white px-5 py-2 font-semibold shadow-md shadow-sky-200 hover:bg-sky-700 transition">
                Get started
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
