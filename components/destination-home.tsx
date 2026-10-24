import { notFound } from "next/navigation";
import { getDestination, isValidDestination } from "@/lib/destinations";
import { getPublishedPageBySlug } from "@/lib/cms";
import { BlockRenderer } from "@/components/block-renderer";
import Hero from "@/components/hero";
import FloatingBookNow from "@/components/floating-book-now";
import CtaBanner from "@/components/cta-banner";
import ActivitiesCarousel from "@/components/activities-carousel";
import PlacesExplorer from "@/components/places-explorer";
import TransportSection from "@/components/transport-section";
import ClimateSection from "@/components/climate-section";

// Shared by `/` (Goa by default) and `/[destination]`.
export default async function DestinationHome({
  destination,
}: {
  destination: string;
}) {
  if (!isValidDestination(destination)) notFound();

  const dest = getDestination(destination)!;
  const { content, label } = dest;

  // Use CMS blocks when a published page exists for this destination slug.
  // Falls back to hardcoded content when no CMS page is found.
  const cmsPage = await getPublishedPageBySlug(destination).catch(() => null);

  if (cmsPage && cmsPage.blocks.length > 0) {
    // Reuse the enquiry link already configured on the page, so the travel
    // information sections point at the same place as the Enquire button.
    const banner = cmsPage.blocks.find((b) => b.type === "enquireBanner");
    const enquiry =
      banner && banner.type === "enquireBanner" && banner.ctaHref
        ? { label: banner.ctaLabel, href: banner.ctaHref }
        : undefined;

    return (
      <>
        {cmsPage.blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            enquiry={enquiry}
            destination={destination}
            destinationLabel={label}
          />
        ))}
        <FloatingBookNow destination={destination} />
      </>
    );
  }

  return (
    <>
      <Hero
        destination={destination}
        heading={content.hero.heading}
        subheading={content.hero.subheading}
        images={content.hero.images}
      />
      <ActivitiesCarousel
        activities={content.activities}
        destinationLabel={label}
      />
      <PlacesExplorer
        districts={content.districts}
        destinationLabel={label}
      />
      {content.transport && content.transport.length > 0 && (
        <TransportSection
          transport={content.transport}
          destinationLabel={label}
        />
      )}
      <ClimateSection climate={content.climate} destinationLabel={label} />
      <CtaBanner destination={destination} destinationLabel={label} />
      <FloatingBookNow destination={destination} />
    </>
  );
}
