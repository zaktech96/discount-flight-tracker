import type { Route } from "./+types/track.$id";
import { PriceDisplay } from "~/components/PriceDisplay";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Track Flight ${params.id} | Flight Guardian` },
  ];
}

export default function TrackFlight({ params }: Route.ComponentProps) {
  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Radar Header */}
        <div className="bg-[#1A1A1A] p-6 border-b border-[#0F7A73]/30 text-center">
          <div className="flex justify-center items-center gap-4 text-[#0F7A73] mb-2 font-mono">
            <span className="text-xl tracking-widest">[LHR]</span>
            <span className="text-xl font-light">-</span>
            <span className="text-xl tracking-widest">[JFK]</span>
          </div>
          <p className="text-[#0F7A73]/60 text-xs tracking-[0.2em] uppercase font-mono">
            Active Radar Surveillance
          </p>
        </div>

        {/* Content */}
        <div className="p-10 text-center font-mono">
          <PriceDisplay price={450} />

          <div className="mt-8 mb-10">
            <label className="block text-xs text-[#1A1A1A]/60 tracking-[0.2em] uppercase mb-3">
              Target Alert Price
            </label>
            <div className="relative max-w-xs mx-auto border-b border-[#1A1A1A]/20 focus-within:border-[#0F7A73] transition-colors pb-2 flex items-center justify-center gap-2">
              <span className="text-[#0F7A73] text-xl font-mono">£</span>
              <input
                type="number"
                placeholder="300"
                className="bg-transparent text-center text-3xl outline-none text-[#1A1A1A] font-mono w-32 placeholder:text-[#1A1A1A]/20"
              />
            </div>
          </div>

          <button className="w-full bg-[#1A1A1A] text-white font-mono text-sm tracking-[0.2em] uppercase py-4 px-6 rounded-lg hover:bg-white hover:text-[#1A1A1A] hover:shadow-[0_0_20px_rgba(15,122,115,0.4)] border border-transparent hover:border-[#1A1A1A] transition-all duration-300">
            Activate Guardian
          </button>
        </div>
      </div>
    </div>
  );
}
