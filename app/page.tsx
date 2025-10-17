"use client";

import { useRef, useState, useEffect, lazy, Suspense } from "react";
import Hero from "@/components/hero";
import FeaturedDestinations from "@/components/featured-destinations";
import FloatingBookNow from "@/components/floating-book-now";
import TourPackages from "@/components/tour-packages";
import { Skeleton } from "@/components/ui/skeleton";

// ✅ Lazy import (it won't load until needed)
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
          observer.disconnect(); // stop observing once loaded
        }
      },
      { threshold: 0.2 } // triggers when 20% of it is visible
    );

    if (highlightRef.current) {
      observer.observe(highlightRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <TourPackages />
      <hr />
      <FeaturedDestinations />

      {/* Placeholder until Highlights scrolls into view */}
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

      <FloatingBookNow />
    </>
  );
}
