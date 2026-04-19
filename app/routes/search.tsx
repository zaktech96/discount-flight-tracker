import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Plane, ArrowRight, Calendar, MapPin, Sparkles, X } from "lucide-react";
import { FLIGHTS, searchFlights, formatRoute } from "~/lib/flights";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    if (!submitted) return FLIGHTS;
    return searchFlights({ from, to });
  }, [from, to, submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClear = () => {
    setFrom("");
    setTo("");
    setDate("");
    setSubmitted(false);
  };

  const isFiltered = submitted && (from || to);
  const heading = isFiltered
    ? `${results.length} ${results.length === 1 ? "flight" : "flights"} found`
    : "Today's best deals";

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-white pt-24 pb-16 px-6 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <motion.header
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Find your flight
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
            Pick a deal below to start tracking — we'll watch the price and
            email you the moment it drops.
          </p>
        </motion.header>

        {/* Search form */}
        <motion.form
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="glass-card dark:bg-slate-900/40 dark:border-white/10 rounded-2xl p-6 md:p-8 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-sky-600 dark:text-sky-400" />{" "}
                Flying from
              </span>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="glass-input dark:bg-slate-900/60 dark:border-white/5 dark:text-white rounded-xl border border-white/70 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="City or airport (e.g. London)"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Plane className="h-4 w-4 text-sky-600 dark:text-sky-400" />{" "}
                Flying to
              </span>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="glass-input dark:bg-slate-900/60 dark:border-white/5 dark:text-white rounded-xl border border-white/70 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="City or airport (e.g. Paris)"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-sky-600 dark:text-sky-400" />{" "}
                When
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-700 dark:text-white"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <button
              type="submit"
              className="glass-button rounded-full bg-sky-600 text-white px-8 py-3 font-semibold shadow-lg shadow-sky-200 dark:shadow-sky-900/20 hover:bg-sky-700 hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
            >
              Search flights
              <ArrowRight className="h-4 w-4" />
            </button>
            {isFiltered ? (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
              >
                <X className="h-4 w-4" />
                Clear search
              </button>
            ) : null}
          </div>
        </motion.form>

        {/* Results header */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-2 mb-4"
        >
          {isFiltered ? (
            <MapPin className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          ) : (
            <Sparkles className="h-5 w-5 text-amber-500" />
          )}
          <h2 className="text-xl font-semibold dark:text-white">{heading}</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {results.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card dark:bg-slate-900/40 dark:border-white/10 rounded-2xl p-10 text-center"
            >
              <div className="mx-auto h-14 w-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-1 dark:text-white">
                No flights for that route yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-5">
                We don't have live prices for this route in the sample data. Try
                a different city, or clear your search to browse today's best
                deals.
              </p>
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-sky-700 transition"
              >
                Show all deals
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="space-y-3"
            >
              {results.map((flight) => {
                const saved = flight.originalPrice - flight.currentPrice;
                const pct = Math.round((saved / flight.originalPrice) * 100);
                return (
                  <motion.div
                    key={flight.id}
                    variants={itemVariants}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      to={`/track/${flight.id}`}
                      className="glass-card dark:bg-slate-900/40 dark:border-white/10 block rounded-2xl p-5 md:p-6 hover:shadow-xl hover:shadow-sky-100 dark:hover:shadow-sky-900/10 hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                            <Plane className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {formatRoute(flight)}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {flight.airline} · {flight.duration} ·{" "}
                              {flight.stops}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                              Departs {flight.departureDate}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="text-right">
                            <div className="flex items-baseline gap-2 justify-end">
                              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                £{flight.currentPrice}
                              </span>
                              <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                                £{flight.originalPrice}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                              Save £{saved} ({pct}% off)
                            </p>
                          </div>
                          <span className="glass-button rounded-full bg-sky-600 text-white px-5 py-2.5 text-sm font-semibold shadow-md shadow-sky-200 dark:shadow-sky-900/20 whitespace-nowrap">
                            Track this flight
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-sm text-slate-500 dark:text-slate-400 mt-10"
        >
          Tracking a flight is free. You can stop watching any time from your
          dashboard.
        </motion.p>
      </div>
    </motion.div>
  );
}
