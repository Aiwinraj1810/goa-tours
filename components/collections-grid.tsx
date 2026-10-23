"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import Reveal from "@/components/reveal";
import { cn } from "@/lib/utils";

type CollectionItem = {
  image: string;
  name: string;
  description: string;
  rating: string;
  startingPrice: string;
  href: string;
};

type CollectionsGridProps = {
  heading: string;
  items: CollectionItem[];
};

// Items keep the order the editor gave them. Their *proportions* rotate through
// this rhythm so a long list reads as a sequence of different moments rather
// than identical cards. The first item (usually the signature activity) is
// given the most room.
const FIRST = { size: "w-[80vw] sm:w-[22rem] lg:w-[min(21vw,20rem)]", aspect: "aspect-[4/5]", drop: "" };
const RHYTHM = [
  { size: "w-[72vw] sm:w-[19rem] lg:w-[min(15vw,14rem)]", aspect: "aspect-[3/4]", drop: "lg:mt-8" },
  { size: "w-[80vw] sm:w-[24rem] lg:w-[min(20vw,19rem)]", aspect: "aspect-[4/3]", drop: "lg:mt-2" },
  { size: "w-[66vw] sm:w-[17rem] lg:w-[min(12.5vw,12rem)]", aspect: "aspect-square", drop: "lg:mt-12" },
  { size: "w-[74vw] sm:w-[20rem] lg:w-[min(16vw,15rem)]", aspect: "aspect-[4/5]", drop: "lg:mt-5" },
];

export default function CollectionsGrid({ heading, items }: CollectionsGridProps) {
  // dragFree: a natural "fling" with momentum on mouse and touch, rather than
  // snapping one card at a time.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback((api: NonNullable<typeof emblaApi>) => {
    setProgress(api.scrollProgress());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => update(emblaApi);
    sync();
    emblaApi.on("scroll", sync).on("reInit", sync).on("select", sync);
    return () => {
      emblaApi.off("scroll", sync).off("reInit", sync).off("select", sync);
    };
  }, [emblaApi, update]);

  if (items.length === 0) return null;

  const draggable = canPrev || canNext;

  return (
    <section className="overflow-hidden bg-background py-[clamp(2.5rem,5vw,4.5rem)]">
      <div className="gutter flex items-end justify-between gap-8">
        <Reveal>
          <h2 className="text-headline max-w-3xl text-balance text-foreground">{heading}</h2>
        </Reveal>
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <span className="mr-2 text-sm tabular-nums text-muted-foreground">
            {String(items.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Previous activities"
            disabled={!canPrev}
            onClick={() => emblaApi?.scrollPrev()}
            className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors enabled:hover:bg-foreground enabled:hover:text-background disabled:opacity-30"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next activities"
            disabled={!canNext}
            onClick={() => emblaApi?.scrollNext()}
            className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors enabled:hover:bg-foreground enabled:hover:text-background disabled:opacity-30"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Embla viewport starts at the page gutter. Overflow is left visible so
          cards glide out across the gutter to the screen edge (the section
          clips at the screen), while dragging works from anywhere on the track. */}
      <div
        className="mt-8 md:mt-10"
        style={{ paddingLeft: "var(--gutter)" }}
      >
        <div
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={heading}
          className={cn(
            "select-none overflow-visible [touch-action:pan-y_pinch-zoom]",
            draggable && "cursor-grab active:cursor-grabbing"
          )}
        >
          <div className="flex items-start pb-3 pr-[var(--gutter)]">
            {items.map((item, i) => {
              const shape = i === 0 ? FIRST : RHYTHM[(i - 1) % RHYTHM.length];
              return (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${items.length}`}
                  className={cn(
                    "mr-[clamp(1rem,2.5vw,2.5rem)] min-w-0 shrink-0 grow-0",
                    shape.size,
                    shape.drop
                  )}
                >
                  <Link
                    href={item.href}
                    draggable={false}
                    className="group block [-webkit-user-drag:none]"
                  >
                    <div
                      className={cn("relative w-full overflow-hidden bg-secondary", shape.aspect)}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        draggable={false}
                        sizes="(min-width: 1024px) 34vw, 80vw"
                        className="pointer-events-none object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                      />
                      {item.rating ? (
                        <span className="absolute left-3 top-3 flex items-center gap-1 bg-white px-2 py-1 text-xs font-semibold text-foreground">
                          <Star className="size-3 fill-highlight text-highlight" />
                          {item.rating}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-4 flex gap-4">
                      <span className="pt-1.5 text-xs tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[clamp(1.15rem,1.75vw,1.6rem)] font-semibold leading-tight tracking-tight text-foreground">
                          {item.name}
                        </h3>
                        {item.description ? (
                          <p className="mt-1.5 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        ) : null}
                        {item.startingPrice ? (
                          <p className="mt-2 text-sm text-muted-foreground">
                            From{" "}
                            <span className="font-semibold text-primary">{item.startingPrice}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress */}
      {draggable ? (
        <div className="gutter mt-4">
          <div className="h-px w-full bg-border">
            <div
              className="h-px bg-foreground transition-[width] duration-150"
              style={{ width: `${Math.max(progress, 0.04) * 100}%` }}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
