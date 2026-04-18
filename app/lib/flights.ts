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
  {
    id: "qr-707",
    airline: "Qatar Airways",
    origin: "London",
    originCode: "LHR",
    destination: "Bali",
    destinationCode: "DPS",
    currentPrice: 489,
    originalPrice: 720,
    duration: "16h 40m",
    stops: "1 stop · Doha",
    departureDate: "Jul 08, 2026",
  },
  {
    id: "lh-808",
    airline: "Lufthansa",
    origin: "London",
    originCode: "LHR",
    destination: "Berlin",
    destinationCode: "BER",
    currentPrice: 89,
    originalPrice: 155,
    duration: "1h 50m",
    stops: "Direct",
    departureDate: "May 20, 2026",
  },
  {
    id: "ry-909",
    airline: "Ryanair",
    origin: "London",
    originCode: "STN",
    destination: "Rome",
    destinationCode: "FCO",
    currentPrice: 62,
    originalPrice: 139,
    duration: "2h 45m",
    stops: "Direct",
    departureDate: "Jun 15, 2026",
  },
  {
    id: "sq-111",
    airline: "Singapore Airlines",
    origin: "London",
    originCode: "LHR",
    destination: "Singapore",
    destinationCode: "SIN",
    currentPrice: 645,
    originalPrice: 890,
    duration: "13h 15m",
    stops: "Direct",
    departureDate: "Aug 02, 2026",
  },
  {
    id: "ua-222",
    airline: "United Airlines",
    origin: "London",
    originCode: "LHR",
    destination: "Los Angeles",
    destinationCode: "LAX",
    currentPrice: 485,
    originalPrice: 640,
    duration: "11h 20m",
    stops: "Direct",
    departureDate: "Jun 28, 2026",
  },
  {
    id: "ke-333",
    airline: "KLM",
    origin: "London",
    originCode: "LHR",
    destination: "Amsterdam",
    destinationCode: "AMS",
    currentPrice: 58,
    originalPrice: 120,
    duration: "1h 15m",
    stops: "Direct",
    departureDate: "May 22, 2026",
  },
];

export function getFlight(id: string): Flight | undefined {
  return FLIGHTS.find((f) => f.id === id);
}

export function formatRoute(flight: Pick<Flight, "origin" | "destination">) {
  return `${flight.origin} → ${flight.destination}`;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function matchesLocation(flight: Flight, query: string, side: "origin" | "destination"): boolean {
  if (!query) return true;
  const q = normalize(query);
  const name = normalize(flight[side]);
  const code = normalize(side === "origin" ? flight.originCode : flight.destinationCode);
  return name.includes(q) || code.includes(q);
}

export type SearchParams = {
  from?: string;
  to?: string;
};

export function searchFlights({ from, to }: SearchParams): Flight[] {
  return FLIGHTS.filter(
    (f) =>
      matchesLocation(f, from ?? "", "origin") &&
      matchesLocation(f, to ?? "", "destination"),
  );
}
