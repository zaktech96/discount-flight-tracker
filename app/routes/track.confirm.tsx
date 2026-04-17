import { Link } from "react-router";
import { Check, Mail, ArrowRight } from "lucide-react";

export default function TrackConfirm() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center text-slate-900 px-6 py-20">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          You're all set!
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed mb-8">
          We're now watching this flight for you. The moment the price drops,
          we'll send you an email so you can book.
        </p>

        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm flex items-center gap-3 text-left mb-8">
          <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <p className="text-sm text-slate-600">
            Confirmation sent to your inbox. Please check your spam folder if
            you don't see it.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 font-semibold shadow-sm hover:bg-sky-700 transition"
        >
          See my tracked flights
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
