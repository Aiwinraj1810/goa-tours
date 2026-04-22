"use client";

import Hero from "@/components/hero";
import FeaturedDestinations from "@/components/featured-destinations";
import FloatingBookNow from "@/components/floating-book-now";
import TourPackages from "@/components/tour-packages";
import { ClientCarousel } from "@/components/ui/client-carousel";
import Highlights from "@/components/testimonials";
import VideoBlock from "@/components/video-block";
import CtaBanner from "@/components/cta-banner";

export default function HomePage() {
  const highlights = [
    {
      id: "fontainhas-1",
      title: "Fontainhas Walk",
      desc:
        "Stroll through Goa's Latin quarter with pastel homes, heritage lanes, and old-world charm.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-bom-jesus_x2ywr2.jpg",
    },
    {
      id: "spice-plantation-1",
      title: "Spice Plantation Tour",
      desc:
        "Discover the aromas and stories behind Goa's spice farms with a relaxed local lunch.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-anjuna_f4fecx.jpg",
    },
    {
      id: "divar-island-1",
      title: "Divar Island Escape",
      desc:
        "Slow down with ferry rides, quiet village roads, and river views away from the beach crowds.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-chapora_rnpimr.jpg",
    },
    {
      id: "fontainhas-2",
      title: "Fontainhas Walk",
      desc:
        "Stroll through Goa's Latin quarter with pastel homes, heritage lanes, and old-world charm.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-bom-jesus_x2ywr2.jpg",
    },
    {
      id: "spice-plantation-2",
      title: "Spice Plantation Tour",
      desc:
        "Discover the aromas and stories behind Goa's spice farms with a relaxed local lunch.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-anjuna_f4fecx.jpg",
    },
    {
      id: "divar-island-2",
      title: "Divar Island Escape",
      desc:
        "Slow down with ferry rides, quiet village roads, and river views away from the beach crowds.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-chapora_rnpimr.jpg",
    },
    {
      id: "fontainhas-3",
      title: "Fontainhas Walk",
      desc:
        "Stroll through Goa's Latin quarter with pastel homes, heritage lanes, and old-world charm.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-bom-jesus_x2ywr2.jpg",
    },
    {
      id: "spice-plantation-3",
      title: "Spice Plantation Tour",
      desc:
        "Discover the aromas and stories behind Goa's spice farms with a relaxed local lunch.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-anjuna_f4fecx.jpg",
    },
    {
      id: "divar-island-3",
      title: "Divar Island Escape",
      desc:
        "Slow down with ferry rides, quiet village roads, and river views away from the beach crowds.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-chapora_rnpimr.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Aarav Mehta",
      title: "Mumbai, India",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-1_yhldzc.jpg",
      text: "Real Goa Holidays made our anniversary trip unforgettable! From private beach dinners to a perfectly planned waterfall trek, every moment felt curated just for us. The team checked in regularly and made sure we experienced the true charm of Goa beyond the usual tourist spots.",
    },
    {
      name: "Sophie & Daniel Wright",
      title: "London, UK",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-2_zgqjpd.jpg",
      text: "We had the most amazing 5 days exploring Goa with Real Goa Holidays! The local guide took us to hidden churches, spice farms, and the best seafood shacks. Everything from transfers to accommodations was seamless. Truly a world-class experience with a local touch.",
    },
    {
      name: "Priya Sharma",
      title: "Bengaluru, India",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-3_rv5oxf.jpg",
      text: "Booked a last-minute weekend getaway through Real Goa Holidays and it was flawless! They arranged everything in hours, from a cozy boutique resort in Anjuna to scooter rentals and sunset cruises. Highly recommend their service if you want a stress-free Goan escape.",
    },
    {
      name: "Lucas Fernandez",
      title: "Lisbon, Portugal",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-4_xd9x3q.jpg",
      text: "Goa was always on my bucket list, and Real Goa Holidays brought it to life. The cultural tour of Old Goa, the beach vibes, and the food trail were simply incredible. Their team goes beyond expectations, you truly feel like you are traveling with friends who know every hidden gem.",
    },
  ];

  return (
    <>
      <Hero />
      <TourPackages />
      <hr />
      <FeaturedDestinations />
      <VideoBlock src="https://res.cloudinary.com/dur23cis9/video/upload/v1776871803/samples/Goa-tours/website-final_gmhsxf.webm" />
      <Highlights items={highlights} />
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
              Memories made, moments cherished, here&apos;s what travelers say
              about Real Goa Holidays.
            </p>
          </div>
          <ClientCarousel testimonials={testimonials} />
        </div>
      </section>

      <CtaBanner />

      <FloatingBookNow />
    </>
  );
}
