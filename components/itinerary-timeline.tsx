"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ItineraryDay } from "@/lib/packages";

export default function ItineraryTimeline({ items }: { items: ItineraryDay[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);
  const olRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = olRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={olRef} className="relative border-l border-gray-200 mb-10">
      {items.map((item, i) => (
        <li
          key={i}
          className="mb-8  last:mb-0 relative"
          style={{ zIndex: hoveredIndex === i ? 10 : "auto" }}
        >
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold ring-4 ring-white">
            {i + 1}
          </span>

          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1 ml-4">
            {item.day}
          </p>

          {/* Title with animated underline and hover image popup */}
          <div
            className="relative inline-block mb-1 cursor-default ml-4"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <h3 className="text-base font-semibold text-foreground">
              {item.title}
            </h3>

            {/* Underline — only for items with an image */}
            {item.image && (
              <span
                className="absolute bottom-0 left-0 h-[2px] bg-primary transition-[width] ease-out"
                style={{
                  width: animated ? "100%" : "0%",
                  transitionDuration: "600ms",
                  transitionDelay: animated ? `${i * 180}ms` : "0ms",
                }}
              />
            )}

            {/* Hover image popup — desktop only */}
            {hoveredIndex === i && item.image && (
              <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-4 z-20 w-52 rounded-xl overflow-hidden shadow-2xl pointer-events-none">
                <div className="relative h-36 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed ml-4">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
