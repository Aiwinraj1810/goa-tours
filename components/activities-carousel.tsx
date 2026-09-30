"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Activity } from "@/lib/destinations/types";

type Props = {
  activities: Activity[];
  destinationLabel: string;
};

export default function ActivitiesCarousel({ activities, destinationLabel }: Props) {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 mb-10">
        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
          Activities
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Things to Do in {destinationLabel}
        </h2>
      </div>

      <Carousel opts={{ align: "start", dragFree: true }} className="max-w-7xl mx-auto px-5">
        <CarouselContent className="-ml-4">
          {activities.map((activity, i) => (
            <CarouselItem
              key={i}
              className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[30%]"
            >
              <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm h-full flex flex-col">
                <div className="relative aspect-[4/3] shrink-0 bg-muted">
                  {activity.image && (
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {activity.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
