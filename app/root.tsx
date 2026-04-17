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
      <body className="bg-white text-slate-900">
        <ClerkProvider
          loaderData={loaderData}
          publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        >
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Navbar />
            <div>
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
      <body className="bg-gradient-to-b from-sky-50 to-white text-slate-900 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl bg-white border border-slate-100 shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-slate-600 mb-4">
            We hit a snag loading this page. Please try again in a moment.
          </p>
          <pre className="mt-4 bg-slate-50 text-slate-600 p-4 rounded-xl overflow-auto text-xs text-left">
            {error?.message || "Please refresh or contact support."}
          </pre>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
