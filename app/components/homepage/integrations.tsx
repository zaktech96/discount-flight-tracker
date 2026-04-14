import { FlightHero } from "~/components/FlightHero";
import { Navbar } from "./navbar";

export default function IntegrationsSection({
  loaderData,
}: {
  loaderData?: { isSignedIn: boolean; hasActiveSubscription: boolean };
}) {
  return (
    <section id="hero">
      <Navbar loaderData={loaderData} />
      <FlightHero isSignedIn={loaderData?.isSignedIn} />
    </section>
  );
}
