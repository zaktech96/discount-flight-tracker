export type Flight = {
  id: string;
  airline: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  currentPrice: number;
  originalPrice: number;
  duration: string;
  stops: string;
  departureDate: string;
};

export const FLIGHTS: Flight[] = [
  {
    id: "ba-101",
    airline: "British Airways",
    origin: "London",
    originCode: "LHR",
    destination: "New York",
    destinationCode: "JFK",
    currentPrice: 420,
    originalPrice: 560,
    duration: "8h 20m",
    stops: "Direct",
    departureDate: "May 12, 2026",
  },
  {
    id: "va-202",
    airline: "Virgin Atlantic",
    origin: "London",
    originCode: "LHR",
    destination: "New York",
    destinationCode: "JFK",
    currentPrice: 380,
    originalPrice: 490,
    duration: "8h 35m",
    stops: "Direct",
    departureDate: "May 14, 2026",
  },
  {
    id: "ek-303",
    airline: "Emirates",
    origin: "London",
    originCode: "LHR",
    destination: "Dubai",
    destinationCode: "DXB",
    currentPrice: 315,
    originalPrice: 450,
    duration: "7h 05m",
    stops: "Direct",
    departureDate: "Jun 02, 2026",
  },
  {
    id: "tp-404",
    airline: "TAP Air Portugal",
    origin: "Boston",
    originCode: "BOS",
    destination: "Lisbon",
    destinationCode: "LIS",
    currentPrice: 198,
    originalPrice: 350,
    duration: "6h 45m",
    stops: "Direct",
    departureDate: "May 28, 2026",
  },
  {
    id: "nh-505",
    airline: "All Nippon Airways",
    origin: "San Francisco",
    originCode: "SFO",
    destination: "Tokyo",
    destinationCode: "NRT",
    currentPrice: 538,
    originalPrice: 720,
    duration: "10h 50m",
    stops: "Direct",
    departureDate: "Jun 18, 2026",
  },
  {
    id: "af-606",
    airline: "Air France",
    origin: "New York",
    originCode: "JFK",
    destination: "Paris",
    destinationCode: "CDG",
    currentPrice: 412,
    originalPrice: 598,
    duration: "7h 15m",
    stops: "Direct",
    departureDate: "Jun 05, 2026",
  },
];

export function getFlight(id: string): Flight | undefined {
  return FLIGHTS.find((f) => f.id === id);
}

export function formatRoute(flight: Pick<Flight, "origin" | "destination">) {
  return `${flight.origin} → ${flight.destination}`;
}
