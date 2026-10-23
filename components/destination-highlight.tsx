"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";

type DestinationTile = {
  image: string;
  name: string;
  subtitle: string;
  href: string;
};

type DestinationHighlightProps = {
  bannerImage: string;
  bannerBadge: string;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerTags: string[];
  bannerPriceLabel: string;
  bannerNote: string;
  bannerCtaLabel: string;
  bannerCtaHref: string;
  moreHref: string;
  tiles: DestinationTile[];
};

type Slide = {
  image: string;
  badge: string;
  eyebrow: string;
  title: string;
  tags: string[];
  priceLabel: string;
  note: string;
  ctaLabel: string;
  ctaHref: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

// Spotlight: one exceptional destination at a time, told through its
// photograph and title. (The practical "which places can I explore" interface
// is the Explore section that follows.)
export default function DestinationHighlight({
  bannerImage,
  bannerBadge,
  bannerEyebrow,
  bannerTitle,
  bannerTags,
  bannerPriceLabel,
  bannerNote,
  bannerCtaLabel,
  bannerCtaHref,
  moreHref,
  tiles,
}: DestinationHighlightProps) {
  // Longer duration = a slower, more deliberate glide between spotlights.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 48 });
  const [current, setCurrent] = useState(0);

  // The banner is the first spotlight; each tile becomes a following one.
  const slides: Slide[] = [
    {
      image: bannerImage,
      badge: bannerBadge,
      eyebrow: bannerEyebrow,
      title: bannerTitle,
      tags: bannerTags,
      priceLabel: bannerPriceLabel,
      note: bannerNote,
      ctaLabel: bannerCtaLabel,
      ctaHref: bannerCtaHref,
    },
    ...tiles.map((tile) => ({
      image: tile.image,
      badge: "",
      eyebrow: tile.subtitle,
      title: tile.name,
      tags: [] as string[],
      priceLabel: "",
      note: "",
      ctaLabel: bannerCtaLabel,
      ctaHref: tile.href || bannerCtaHref,
    })),
  ];

  const onSelect = useCallback(() => {
    if (emblaApi) setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const active = slides[current] ?? slides[0];
  const multiple = slides.length > 1;
  const upNext = multiple ? slides[(current + 1) % slides.length] : null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={bannerTitle}
      className="relative h-[88svh] min-h-[540px] w-full overflow-hidden bg-navy text-white"
    >
      {/* Photography — edge to edge, swipeable */}
      <div ref={emblaRef} className="absolute inset-0 h-full overflow-hidden">
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                priority={i === 0}
                className={cn(
                  "object-cover transition-transform duration-[9000ms] ease-out",
                  i === current ? "scale-100" : "scale-[1.08]"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 to-transparent" />

      {/* Spotlight marker */}
      <div className="gutter pointer-events-none absolute inset-x-0 top-0 flex items-center gap-4 pt-8 md:pt-10">
        <span className="eyebrow text-white/90">Spotlight</span>
        <span className="h-px w-10 bg-white/40" aria-hidden />
        {multiple ? (
          <span className="text-xs tabular-nums text-white/70">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      {moreHref ? (
        <Link
          href={moreHref}
          className="gutter absolute right-0 top-0 hidden pt-8 text-sm font-medium text-white/80 transition-colors hover:text-white md:block md:pt-10"
        >
          <span className="border-b border-white/40 pb-0.5">See more destinations</span>
        </Link>
      ) : null}

      {/* Editorial caption for the spotlight */}
      <div className="gutter pointer-events-none absolute inset-x-0 bottom-0 pb-[clamp(2rem,6vh,4.5rem)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25, ease } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.35 } }}
              >
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                  {active.eyebrow ? (
                    <span className="eyebrow text-white/80">{active.eyebrow}</span>
                  ) : null}
                  {active.badge ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-white">
                      <Star className="size-3.5 fill-highlight text-highlight" />
                      {active.badge}
                    </span>
                  ) : null}
                </div>

                <h2 className="text-display text-balance">{active.title}</h2>

                {active.tags.length > 0 ? (
                  <p className="mt-5 text-sm text-white/75 md:text-base">
                    {active.tags.join("  ·  ")}
                  </p>
                ) : null}

                {active.priceLabel ? (
                  <p className="mt-3 text-sm font-medium text-white/90">{active.priceLabel}</p>
                ) : null}

                <div className="pointer-events-auto mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {active.ctaLabel ? (
                    <Link
                      href={active.ctaHref}
                      className="group inline-flex items-center gap-2 border-b border-white/60 pb-1 text-sm font-medium transition-colors hover:border-white"
                    >
                      {active.ctaLabel}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : null}
                  {active.note ? (
                    <span className="text-xs text-white/60">{active.note}</span>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quiet navigation: a hint of what comes next, not a list of places */}
          {multiple && upNext ? (
            <div className="pointer-events-auto flex items-center justify-between gap-6 lg:justify-end">
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                className="group max-w-56 text-left"
                aria-label={`Next spotlight: ${upNext.title}`}
              >
                <span className="eyebrow block text-white/60">Next</span>
                <span className="mt-1 block truncate text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                  {upNext.title}
                </span>
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous spotlight"
                  onClick={() => emblaApi?.scrollPrev()}
                  className="flex size-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-black"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next spotlight"
                  onClick={() => emblaApi?.scrollNext()}
                  className="flex size-11 items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-black"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Story-style progress */}
        {multiple ? (
          <div className="pointer-events-auto mt-8 flex gap-1.5" role="tablist" aria-label="Spotlights">
            {slides.map((slide, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={slide.title}
                onClick={() => emblaApi?.scrollTo(i)}
                className="group flex-1 py-2"
              >
                <span
                  className={cn(
                    "block h-px w-full transition-colors duration-500",
                    i === current ? "bg-white" : "bg-white/30 group-hover:bg-white/60"
                  )}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
