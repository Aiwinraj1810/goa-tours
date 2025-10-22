"use client";

import { useRef, useState, useEffect, lazy, Suspense } from "react";
import Hero from "@/components/hero";
import FeaturedDestinations from "@/components/featured-destinations";
import FloatingBookNow from "@/components/floating-book-now";
import TourPackages from "@/components/tour-packages";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  return (
    <>
      <Hero />
      <TourPackages />
      <hr />
      <FeaturedDestinations />

      {/* Lazy Loaded Highlights */}
      <div ref={highlightRef} className="min-h-[200px]">
        {visible ? (
          <Suspense fallback={<div className="text-center py-20">Loading highlights...</div>}>
            <Highlights />
          </Suspense>
        ) : (
          <div className="text-center py-20 text-muted-foreground animate-pulse">
            <Skeleton className="w-full h-[200px] rounded-2xl" />
          </div>
        )}
      </div>

      {/* --- CTA Banner --- */}
      <section className="relative bg-[url('https://res.cloudinary.com/dur23cis9/image/upload/v1760684111/pexels-rohit-sharma-1230131-23322244_xyzvj8.jpg')] bg-cover bg-center py-24 mt-16">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative mx-auto max-w-5xl px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Ready to Experience <span className="text-primary">Real Goa</span>?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Let us craft the perfect getaway for you — from sun-kissed beaches to heritage adventures.
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
