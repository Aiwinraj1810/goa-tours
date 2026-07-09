import { notFound } from "next/navigation";
import { getDestination, isValidDestination } from "@/lib/destinations";
import Hero from "@/components/hero";
import FeaturedDestinations from "@/components/featured-destinations";
import FloatingBookNow from "@/components/floating-book-now";
import TourPackages from "@/components/tour-packages";
import { ClientCarousel } from "@/components/ui/client-carousel";
import Highlights from "@/components/testimonials";
import VideoBlock from "@/components/video-block";
import CtaBanner from "@/components/cta-banner";

export default async function DestinationHomePage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = await params;
  if (!isValidDestination(destination)) notFound();

  const dest = getDestination(destination)!;
  const { content, packages, label } = dest;

  return (
    <>
      <Hero
        destination={destination}
        heading={content.hero.heading}
        subheading={content.hero.subheading}
      />
      <TourPackages
        packages={packages}
        destination={destination}
        destinationLabel={label}
      />
      <hr />
      <FeaturedDestinations />
      {content.hero.videoSrc && (
        <VideoBlock src={content.hero.videoSrc} />
      )}
      <Highlights items={content.highlights} />
      <section aria-labelledby="clients-heading" className="py-16 bg-gray-50">
        <div className="container mx-auto px-0 lg:px-4">
          <div className="text-center mb-12">
            <h2
              id="clients-heading"
              className="text-3xl font-bold text-gray-800 mb-4 text-pretty"
            >
              Memories That Stay with You
            </h2>
            <p className="text-gray-600 px-5 lg:px-0">
              Memories made, moments cherished — here&apos;s what travellers say
              about Real Goa Holidays.
            </p>
          </div>
          <ClientCarousel testimonials={content.testimonials} />
        </div>
      </section>
      <CtaBanner destination={destination} destinationLabel={label} />
      <FloatingBookNow destination={destination} />
    </>
  );
}
