import type { Flight } from "./flights";

export type TrackedFlight = Flight & {
  targetPrice: number;
  trackedAt: string;
};

const STORAGE_KEY = "flight-guardian:tracked";

export function getTrackedFlights(): TrackedFlight[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackedFlight[]) : [];
  } catch {
    return [];
  }
}

export function getTrackedFlight(id: string): TrackedFlight | undefined {
  return getTrackedFlights().find((f) => f.id === id);
}

export function addTrackedFlight(
  flight: Flight,
  targetPrice: number,
): TrackedFlight {
  const tracked: TrackedFlight = {
    ...flight,
    targetPrice,
    trackedAt: new Date().toISOString(),
  };
  const all = getTrackedFlights().filter((f) => f.id !== flight.id);
  all.unshift(tracked);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return tracked;
}

export function removeTrackedFlight(id: string): void {
  const all = getTrackedFlights().filter((f) => f.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
