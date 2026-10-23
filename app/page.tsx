import DestinationHome from "@/components/destination-home";

// The old Goa/Kerala split chooser lives in components/_archive/split-landing.tsx.
// Destination switching now happens via the toggle in the Hero.
export default function HomePage() {
  return <DestinationHome destination="goa" />;
}
