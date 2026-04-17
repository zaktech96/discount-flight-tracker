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
    <nav className="w-full border-b border-slate-100 bg-white/90 backdrop-blur-md fixed top-0 z-50">
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
              <button className="rounded-full bg-sky-600 text-white px-5 py-2 font-semibold shadow-sm hover:bg-sky-700 transition">
                Get started
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
