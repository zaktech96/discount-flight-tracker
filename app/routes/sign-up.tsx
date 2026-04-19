import { SignUp } from "@clerk/react-router";
import { Navigate } from "react-router";
import { isFeatureEnabled, isServiceEnabled } from "../../config";

export default function SignUpPage() {
  // Redirect if auth is not enabled
  if (!isFeatureEnabled('auth') || !isServiceEnabled('clerk')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen px-6 bg-gradient-to-b from-sky-50 via-white to-white overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-sky-200/40 blur-3xl animate-blob-drift" />
        <div
          className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-indigo-200/40 blur-3xl animate-blob-drift"
          style={{ animationDelay: "4s" }}
        />
      </div>
      <SignUp />
    </div>
  );
}
