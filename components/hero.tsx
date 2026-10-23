"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const defaultImages = [
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-9.jpg",
];

const SLIDE_MS = 7000;
const ease = [0.22, 1, 0.36, 1] as const;

type HeroProps = {
  destination: string;
  badge?: string;
  heading: string;
  subheading: string;
  locationLabel?: string;
  bestTime?: string;
  images?: string[] | null;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  ribbonText?: string;
  ribbonCtaLabel?: string;
  ribbonCtaHref?: string;
};

export default function Hero({
  destination,
  badge,
  heading,
  subheading,
  locationLabel,
  bestTime,
  images,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  ribbonText,
  ribbonCtaLabel,
  ribbonCtaHref,
}: HeroProps) {
  const heroImages = images && images.length > 0 ? images : defaultImages;
  const count = heroImages.length;
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    // No auto-advancing for visitors who ask for reduced motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setAutoplay(!reduced.matches);
  }, []);

  useEffect(() => {
    if (count < 2 || !autoplay) return;
    const id = window.setTimeout(next, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, count, autoplay, next]);

  const peekImage = heroImages[(index + 1) % count];

  return (
    <section aria-label={`${destination} hero`}>
      <div className="relative isolate h-[100svh] min-h-[560px] w-full overflow-hidden bg-navy">
        {/* Background photography — crossfade between slides */}
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <Image
              src={heroImages[index]}
              alt={`${destination} view ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Even tone for legibility, plus a bottom scrim where the type sits */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="gutter relative z-10 flex h-full flex-col justify-between pb-[clamp(2rem,6vh,4.5rem)] pt-28 md:pt-36">
          {/* Top: best time (the Goa / Kerala switch lives in the header) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white">
            {bestTime ? (
              <span className="eyebrow text-white/80">
                Best time to visit · {bestTime}
              </span>
            ) : null}
          </div>

          {/* Bottom: heading, copy, actions */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-5xl text-white">
              {badge ? (
                <motion.p
                  className="eyebrow mb-5 text-white/80"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease }}
                >
                  {badge}
                </motion.p>
              ) : null}

              <motion.h1
                className="text-display text-balance"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
              >
                {heading}
              </motion.h1>

              <motion.p
                className="measure mt-6 text-base text-white/85 md:text-xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease }}
              >
                {subheading}
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.38, ease }}
              >
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-primary px-8 text-primary-foreground hover:bg-white hover:text-black"
                >
                  <Link href={primaryCtaHref || `/${destination}/contact`}>
                    {primaryCtaLabel || "Book Your Trip"}
                  </Link>
                </Button>
                <Link
                  href={secondaryCtaHref || `/${destination}/gallery`}
                  className="group inline-flex items-center gap-2 border-b border-white/50 pb-1 text-sm font-medium text-white transition-colors hover:border-white"
                >
                  {secondaryCtaLabel || "Explore Gallery"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {locationLabel ? (
                <p className="mt-8 flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin className="size-4" />
                  {locationLabel}
                </p>
              ) : null}
            </div>

            {/* Next slide: an intentional part of the composition */}
            {count > 1 ? (
              <div className="flex items-end gap-5 text-white lg:flex-col lg:items-end lg:gap-4">
                <button
                  type="button"
                  onClick={next}
                  aria-label="Show next photo"
                  className="group relative hidden aspect-[4/5] w-[clamp(7rem,11vw,10.5rem)] overflow-hidden rounded-2xl sm:block"
                >
                  <Image
                    src={peekImage}
                    alt=""
                    fill
                    sizes="12vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-black/20" />
                  <span className="eyebrow absolute bottom-3 left-3">Next</span>
                </button>

                <div className="w-full min-w-40 lg:w-[clamp(7rem,11vw,10.5rem)]">
                  <div className="mb-2 flex justify-between text-xs tabular-nums text-white/80">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{String(count).padStart(2, "0")}</span>
                  </div>
                  <div className="h-px w-full bg-white/30">
                    <motion.div
                      key={`${index}-${autoplay}`}
                      className="h-px bg-white"
                      initial={{ width: autoplay ? "0%" : "100%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: autoplay ? SLIDE_MS / 1000 : 0, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Promo ribbon */}
      {ribbonText ? (
        <div className="gutter flex flex-col items-start justify-between gap-3 bg-navy py-4 text-navy-foreground md:flex-row md:items-center">
          <p className="text-sm font-medium">{ribbonText}</p>
          {ribbonCtaLabel ? (
            <Link
              href={ribbonCtaHref || `/${destination}/packages`}
              className="group inline-flex shrink-0 items-center gap-2 border-b border-navy-foreground/40 pb-0.5 text-sm font-medium transition-colors hover:border-navy-foreground"
            >
              {ribbonCtaLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
