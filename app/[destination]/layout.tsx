import type { Metadata } from "next";
import { getDestination, isValidDestination } from "@/lib/destinations";
import { getPublishedPageBySlug } from "@/lib/cms";
import { hasPhoto } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  params: Promise<{ destination: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { destination } = await params;
  if (!isValidDestination(destination)) return {};

  const dest = getDestination(destination)!;
  // The CMS page for this destination can supply its own SEO title/description.
  const cms = await getPublishedPageBySlug(destination).catch(() => null);
  const title = cms?.seoTitle || `Real Goa Holidays | ${dest.label} — ${dest.tagline}`;
  const description =
    cms?.seoDescription ||
    `Premium ${dest.label} travel and tour services by Real Goa Holidays. ${dest.content.hero.subheading}`;
  return {
    title,
    description,
    keywords: [`${dest.label} Tourism`, `Best ${dest.label} Travel Packages`, "Real Goa Holidays"],
    openGraph: {
      title,
      description: cms?.seoDescription || dest.content.hero.heading,
      // Stock placeholder art is not a usable share image; fall back to the site default.
      images: hasPhoto(dest.coverImage) ? [dest.coverImage] : ["/images/hero.jpg"],
      type: "website",
    },
  };
}

export default async function DestinationLayout({ children, params }: Props) {
  // Non-destination segments (e.g. /faq, /about) are handled by the page component
  // as global CMS pages — don't 404 here.
  return <>{children}</>;
}
