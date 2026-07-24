"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { District } from "@/lib/destinations/types";

type Props = {
  districts: District[];
  destinationLabel: string;
};

export default function PlacesExplorer({ districts, destinationLabel }: Props) {
  const [activeDistrict, setActiveDistrict] = useState(0);
  const [activePlace, setActivePlace] = useState(0);

  const district = districts[activeDistrict];
  const place = district.places[activePlace];

  function handleDistrictChange(i: number) {
    setActiveDistrict(i);
    setActivePlace(0);
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-5">
        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
          Explore
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Explore {destinationLabel}
        </h2>

        {/* District tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {districts.map((d, i) => (
            <button
              key={d.name}
              onClick={() => handleDistrictChange(i)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0",
                i === activeDistrict
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-background border border-border text-foreground hover:border-primary/50"
              )}
            >
              {d.name}
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border/50 shadow-sm">
          {/* Left: places list */}
          <div className="bg-background p-5 lg:p-8">
            <ul className="space-y-1">
              {district.places.map((p, i) => (
                <li key={p.name}>
                  <button
                    onClick={() => setActivePlace(i)}
                    className={cn(
                      "w-full text-left px-4 py-3.5 rounded-xl transition-all",
                      i === activePlace
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <span className="font-medium text-base leading-snug">{p.name}</span>
                    {p.description && (
                      <p
                        className={cn(
                          "text-sm mt-0.5 line-clamp-1",
                          i === activePlace
                            ? "text-primary-foreground/75"
                            : "text-muted-foreground"
                        )}
                      >
                        {p.description}
                      </p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: image carousel */}
          <div className="relative min-h-[300px] lg:min-h-[480px] bg-muted overflow-hidden">
            <Carousel
              key={`${activeDistrict}-${activePlace}`}
              opts={{ align: "start", loop: place.images.length > 1 }}
              className="h-full"
            >
              <CarouselContent className="-ml-0 h-full">
                {place.images.map((src, i) => (
                  <CarouselItem key={i} className="pl-0 relative h-full min-h-[300px] lg:min-h-[480px]">
                    <Image
                      src={src}
                      alt={`${place.name} — photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Place name overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/65 to-transparent p-6 pointer-events-none z-10">
              <p className="text-white font-semibold text-lg leading-snug">{place.name}</p>
              {place.description && (
                <p className="text-white/75 text-sm mt-1">{place.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
