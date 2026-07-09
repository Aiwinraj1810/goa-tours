import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDestination, isValidDestination } from "@/lib/destinations";

type Props = {
  children: React.ReactNode;
  params: Promise<{ destination: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destination } = await params;
  if (!isValidDestination(destination)) return {};

  const dest = getDestination(destination)!;
  return {
    title: `Real Goa Holidays | ${dest.label} — ${dest.tagline}`,
    description: `Premium ${dest.label} travel and tour services by Real Goa Holidays. ${dest.content.hero.subheading}`,
    keywords: [`${dest.label} Tourism`, `Best ${dest.label} Travel Packages`, "Real Goa Holidays"],
    openGraph: {
      title: `Real Goa Holidays | ${dest.label} — ${dest.tagline}`,
      description: dest.content.hero.heading,
      images: [dest.coverImage],
      type: "website",
    },
  };
}

export default async function DestinationLayout({ children, params }: Props) {
  const { destination } = await params;
  if (!isValidDestination(destination)) notFound();

  return <>{children}</>;
}
