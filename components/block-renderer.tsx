import type { Block } from "@/lib/cms-types";

import ActivitiesCarousel from "@/components/activities-carousel";
import ClimateSection from "@/components/climate-section";
import CtaBanner from "@/components/cta-banner";
import GalleryGrid from "@/components/gallery-grid";
import Hero from "@/components/hero";
import PlacesExplorer from "@/components/places-explorer";
import TransportSection from "@/components/transport-section";
import { ClientCarousel } from "@/components/ui/client-carousel";

type Props = {
  block: Block;
  destination?: string;
  destinationLabel?: string;
};

export function BlockRenderer({ block, destination = "", destinationLabel = "" }: Props) {
  switch (block.type) {
    case "hero":
      return (
        <Hero
          destination={destination}
          heading={block.heading}
          subheading={block.subheading}
          images={block.images.length > 0 ? block.images : undefined}
        />
      );

    case "activities":
      return (
        <ActivitiesCarousel
          activities={block.activities}
          destinationLabel={destinationLabel}
        />
      );

    case "places":
      return (
        <PlacesExplorer
          districts={block.districts}
          destinationLabel={destinationLabel}
        />
      );

    case "transport":
      if (block.entries.length === 0) return null;
      return (
        <TransportSection
          transport={block.entries}
          destinationLabel={destinationLabel}
        />
      );

    case "climate":
      return (
        <ClimateSection
          climate={block.entries}
          destinationLabel={destinationLabel}
        />
      );

    case "testimonials":
      if (block.testimonials.length === 0) return null;
      return (
        <section className="py-16 px-4">
          <ClientCarousel testimonials={block.testimonials} />
        </section>
      );

    case "gallery":
      if (block.images.length === 0) return null;
      return <GalleryGrid images={block.images} />;

    case "cta":
      return <CtaBanner destination={destination} destinationLabel={destinationLabel} />;

    case "richText":
      if (!block.body) return null;
      return (
        <section className="mx-auto max-w-3xl px-4 py-12">
          <div className="prose prose-lg">{block.body}</div>
        </section>
      );
  }
}
