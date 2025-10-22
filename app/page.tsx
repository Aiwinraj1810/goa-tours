"use client";

import { useRef, useState, useEffect, lazy, Suspense } from "react";
import Hero from "@/components/hero";
import FeaturedDestinations from "@/components/featured-destinations";
import FloatingBookNow from "@/components/floating-book-now";
import TourPackages from "@/components/tour-packages";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClientCarousel } from "@/components/ui/client-carousel";

// ✅ Lazy import
const Highlights = lazy(() => import("@/components/testimonials"));

export default function HomePage() {
  const highlightRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Observe when Highlights enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (highlightRef.current) observer.observe(highlightRef.current);

    return () => observer.disconnect();
  }, []);
  const testimonials = [
    {
      name: "Aarav Mehta",
      title: "Mumbai, India",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-1_yhldzc.jpg",
      text: "Real Goa Holidays made our anniversary trip unforgettable! From private beach dinners to a perfectly planned waterfall trek, every moment felt curated just for us. The team checked in regularly and made sure we experienced the true charm of Goa — beyond the usual tourist spots.",
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
      text: "Booked a last-minute weekend getaway through Real Goa Holidays — and it was flawless! They arranged everything in hours, from a cozy boutique resort in Anjuna to scooter rentals and sunset cruises. Highly recommend their service if you want a stress-free Goan escape.",
    },
    {
      name: "Lucas Fernandez",
      title: "Lisbon, Portugal",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-4_xd9x3q.jpg",
      text: "Goa was always on my bucket list, and Real Goa Holidays brought it to life. The cultural tour of Old Goa, the beach vibes, and the food trail were simply incredible. Their team goes beyond expectations — you truly feel like you’re traveling with friends who know every hidden gem.",
    },
  ];

  return (
    <>
      <Hero />
      <TourPackages />
      <hr />
      <FeaturedDestinations />

      {/* Lazy Loaded Highlights */}
      <div ref={highlightRef} className="min-h-[200px]">
        {visible ? (
          <Suspense
            fallback={
              <div className="text-center py-20">Loading highlights...</div>
            }
          >
            <Highlights />
          </Suspense>
        ) : (
          <div className="text-center py-20 text-muted-foreground animate-pulse">
            <Skeleton className="w-full h-[200px] rounded-2xl" />
          </div>
        )}
      </div>
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
              Memories made, moments cherished — here’s what travelers say about
              Real Goa Holidays.
            </p>
          </div>
          <ClientCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* --- CTA Banner --- */}
      <section className="relative bg-[url('https://res.cloudinary.com/dur23cis9/image/upload/v1760684111/pexels-rohit-sharma-1230131-23322244_xyzvj8.jpg')] bg-cover bg-center py-40 mt-16">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative mx-auto max-w-5xl px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Ready to Experience <span className="text-primary">Real Goa</span>?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Let us craft the perfect getaway for you — from sun-kissed beaches
            to heritage adventures.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:opacity-90 shadow-lg transition-all"
            >
              Plan Your Trip
            </Button>
          </Link>
        </div>
      </section>
 

      <FloatingBookNow />
    </>
  );
}
