import { Link } from "react-router";
import { Plane, Bell, PiggyBank, Search, Heart, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-28 pb-20 px-6">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.15),transparent_60%)]"
          />
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-700 px-4 py-1.5 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              We're watching prices right now
            </span>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Never miss a{" "}
              <span className="text-sky-600">cheap flight</span> again.
            </h1>

            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Tell us where you want to go and your budget. We'll watch flights
              24/7 and email you the moment prices drop — so you can book with
              confidence.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 text-white px-8 py-4 font-semibold shadow-lg shadow-sky-200 hover:bg-sky-700 transition"
              >
                <Search className="h-5 w-5" />
                Find cheap flights
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 border border-slate-200 px-8 py-4 font-semibold hover:bg-slate-50 transition"
              >
                My tracked flights
              </Link>
            </div>

            <p className="text-slate-500 text-sm pt-2">
              Free to get started · No credit card needed
            </p>

            {/* Price-drop preview card */}
            <div className="pt-14 max-w-md mx-auto">
              <div className="rounded-2xl bg-white shadow-xl shadow-sky-100 border border-slate-100 p-5 text-left flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Bell className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    Price dropped!
                  </p>
                  <p className="text-slate-900 font-semibold mt-0.5">
                    London → New York
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-slate-900">
                      £340
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      £520
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Save 35%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                How it works
              </h2>
              <p className="text-slate-600 mt-3 text-lg">
                Three simple steps. Zero stress.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Search,
                  step: "1",
                  title: "Tell us your trip",
                  body: "Enter where you're flying from, where you're going, and when. Takes about 30 seconds.",
                },
                {
                  icon: Heart,
                  step: "2",
                  title: "Set your dream price",
                  body: "Let us know what you're happy to pay. No pressure to book right away — we'll keep watching.",
                },
                {
                  icon: Bell,
                  step: "3",
                  title: "Get a friendly heads-up",
                  body: "The moment a flight drops to your price, we'll send you an email with a direct booking link.",
                },
              ].map(({ icon: Icon, step, title, body }) => (
                <div
                  key={step}
                  className="rounded-2xl bg-gradient-to-b from-sky-50 to-white border border-slate-100 p-8 hover:shadow-lg hover:shadow-sky-100 transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white font-bold">
                      {step}
                    </span>
                    <Icon className="h-5 w-5 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-slate-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY YOU'LL LOVE IT */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Why travelers love us
              </h2>
              <p className="text-slate-600 mt-3 text-lg">
                Built to save you money — and time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: PiggyBank,
                  title: "Save hundreds per trip",
                  body: "Our members typically save 30–50% by catching flights at the perfect moment, not when it's convenient to check.",
                },
                {
                  icon: Bell,
                  title: "Instant email alerts",
                  body: "The second your flight drops, your inbox pings. Book in minutes — before the deal disappears.",
                },
                {
                  icon: Plane,
                  title: "Works for any route",
                  body: "Weekend getaways, dream honeymoons, back-home visits — track as many trips as you like.",
                },
                {
                  icon: Heart,
                  title: "No spam, ever",
                  body: "We only email you about deals that hit your price. No newsletters, no sales pitches, no noise.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-md transition"
                >
                  <div className="h-12 w-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-slate-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST / TESTIMONIAL */}
        <section className="py-16 px-6 bg-sky-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 text-amber-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium">
              "Saved us £400 on our family trip to Lisbon. I set up an alert,
              went about my week, and got an email on Tuesday morning. Booked
              in 5 minutes."
            </p>
            <p className="mt-4 text-slate-600">— Sarah M., traveler from Manchester</p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center rounded-3xl bg-gradient-to-br from-sky-600 to-sky-500 p-12 md:p-16 text-white shadow-xl shadow-sky-200">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready for your next trip?
            </h2>
            <p className="text-sky-100 text-lg mb-8 max-w-xl mx-auto">
              Start watching a flight now. It's free, and you can cancel the
              alert any time.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-full bg-white text-sky-700 px-8 py-4 font-semibold shadow-lg hover:bg-slate-50 transition"
            >
              <Plane className="h-5 w-5" />
              Start tracking a flight
            </Link>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-sky-100">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4" /> Free to start
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4" /> No credit card
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4" /> Cancel anytime
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
