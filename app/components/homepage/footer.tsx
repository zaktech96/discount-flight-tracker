import { Link } from "react-router";

export default function FooterSection() {
  return (
    <footer className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Live Activity Component */}
        <div className="mb-12 border border-[#1A1A1A]/10 bg-white/50 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto flex items-center justify-center gap-3 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F7A73] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0F7A73]" />
          </span>
          <p className="font-mono text-sm text-[#1A1A1A] tracking-[0.05em]">
            Guardian intercepted a £40 drop for LHR-CDG 2 mins ago.
          </p>
        </div>

        <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
          <Link
            to="https://x.com/_7obaid_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter"
            className="text-muted-foreground hover:text-primary block"
          >
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
              ></path>
            </svg>
          </Link>
        </div>
        <span className="text-muted-foreground block text-center text-sm">
          {" "}
          © {new Date().getFullYear()} Flight Guardian, All rights reserved
        </span>
      </div>
    </footer>
  );
}
