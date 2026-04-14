import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import { ClerkProvider, useAuth } from "@clerk/react-router";
import { rootAuthLoader } from "@clerk/react-router/ssr.server";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { Navbar } from "./components/navigation/navbar";
import "./app.css";

// 1. The Loader: This fetches the auth state on the server
export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args);
}

const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convex = new ConvexReactClient(convexUrl || "");

// 2. The Component: Receives loaderData and passes it to Clerk
export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#0F172A] text-white">
        <ClerkProvider
          loaderData={loaderData}
          publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        >
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Navbar />
            <div className="pt-20">
              <Outlet />
            </div>
            <ScrollRestoration />
            <Scripts />
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-[#0F172A] text-white p-10 font-mono">
        <h1 className="text-red-500 text-2xl font-bold">
          AUTH_HANDSHAKE_FAILED
        </h1>
        <p className="mt-4 text-slate-400">
          Ensure Clerk API keys are set in Vercel.
        </p>
        <pre className="mt-6 bg-black/50 p-4 border border-white/10 overflow-auto text-xs">
          {error?.message || "Check server logs for details."}
        </pre>
        <Scripts />
      </body>
    </html>
  );
}
