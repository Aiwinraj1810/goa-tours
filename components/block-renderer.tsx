import type { Block } from "@/lib/cms-types";

import ActivitiesCarousel from "@/components/activities-carousel";
import ClimateSection from "@/components/climate-section";
import CollectionsGrid from "@/components/collections-grid";
import CtaBanner from "@/components/cta-banner";
import DestinationHighlight from "@/components/destination-highlight";
import EnquireBanner from "@/components/enquire-banner";
import FaqAccordion from "@/components/faq-accordion";
import FeaturesGrid from "@/components/features-grid";
import GalleryGrid from "@/components/gallery-grid";
import Hero from "@/components/hero";
import OffersGrid from "@/components/offers-grid";
import PlacesExplorer from "@/components/places-explorer";
import TourPackagesGrid from "@/components/tour-packages-grid";
import TransportSection from "@/components/transport-section";
import TestimonialsQuote from "@/components/testimonials-quote";
import RichText from "@/components/rich-text";

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
          badge={block.badge}
          heading={block.heading}
          subheading={block.subheading}
          locationLabel={block.locationLabel}
          bestTime={block.bestTime}
          images={block.images.length > 0 ? block.images : undefined}
          primaryCtaLabel={block.primaryCtaLabel}
          primaryCtaHref={block.primaryCtaHref}
          secondaryCtaLabel={block.secondaryCtaLabel}
          secondaryCtaHref={block.secondaryCtaHref}
          ribbonText={block.ribbonText}
          ribbonCtaLabel={block.ribbonCtaLabel}
          ribbonCtaHref={block.ribbonCtaHref}
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
        <TestimonialsQuote
          heading={block.heading || "What Our Travelers Say"}
          testimonials={block.testimonials}
        />
      );

    case "gallery":
      if (block.images.length === 0) return null;
      return <GalleryGrid images={block.images} />;

    case "cta":
      return <CtaBanner destination={destination} destinationLabel={destinationLabel} />;

    case "richText":
      if (!block.body) return null;
      return <RichText body={block.body} />;

    case "tourPackages":
      if (block.packages.length === 0) return null;
      return (
        <TourPackagesGrid
          heading={block.heading}
          moreHref={block.moreHref}
          packages={block.packages}
        />
      );

    case "destinationHighlight":
      if (!block.bannerImage) return null;
      return (
        <DestinationHighlight
          bannerImage={block.bannerImage}
          bannerBadge={block.bannerBadge}
          bannerEyebrow={block.bannerEyebrow}
          bannerTitle={block.bannerTitle}
          bannerTags={block.bannerTags}
          bannerPriceLabel={block.bannerPriceLabel}
          bannerNote={block.bannerNote}
          bannerCtaLabel={block.bannerCtaLabel}
          bannerCtaHref={block.bannerCtaHref}
          moreHref={block.moreHref}
          tiles={block.tiles}
        />
      );

    case "features":
      if (block.features.length === 0) return null;
      return (
        <FeaturesGrid
          heading={block.heading}
          subheading={block.subheading}
          primaryCtaLabel={block.primaryCtaLabel}
          primaryCtaHref={block.primaryCtaHref}
          secondaryCtaLabel={block.secondaryCtaLabel}
          secondaryCtaHref={block.secondaryCtaHref}
          features={block.features}
        />
      );

    case "enquireBanner":
      if (!block.image) return null;
      return (
        <EnquireBanner
          image={block.image}
          imageCaptionTitle={block.imageCaptionTitle}
          imageCaptionSubtitle={block.imageCaptionSubtitle}
          heading={block.heading}
          body={block.body}
          ratingText={block.ratingText}
          ctaLabel={block.ctaLabel}
          ctaHref={block.ctaHref}
          phones={block.phones}
        />
      );

    case "collections":
      if (block.items.length === 0) return null;
      return <CollectionsGrid heading={block.heading} items={block.items} />;

    case "offers":
      if (block.offers.length === 0) return null;
      return (
        <OffersGrid heading={block.heading} subheading={block.subheading} offers={block.offers} />
      );

    case "faq":
      if (block.items.length === 0) return null;
      return (
        <FaqAccordion heading={block.heading} subheading={block.subheading} items={block.items} />
      );
  }
}
