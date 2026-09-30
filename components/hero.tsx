"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const defaultImages = [
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-9.jpg",
];

type HeroProps = {
  destination: string;
  badge?: string;
  heading: string;
  subheading: string;
  locationLabel?: string;
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
  const peekImage = heroImages[1] ?? heroImages[0];

  return (
    <section aria-label={`${destination} hero`}>
      <div className="relative isolate overflow-hidden h-[100svh] w-full bg-background">
        {/* --- Background Carousel --- */}
        <div className="absolute inset-0">
          <Carousel
            plugins={[Autoplay({ delay: 7000 })]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="h-full w-full"
          >
            <CarouselContent>
              {heroImages.map((src, i) => (
                <CarouselItem key={i} className="relative h-[100svh]">
                  <Image
                    src={src}
                    alt={`${destination} view ${i + 1}`}
                    fill
                    className="object-cover brightness-[0.90]"
                    priority={i === 0}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* --- Overlay Text --- */}
        <div className="relative z-10 flex h-full flex-col justify-end md:justify-center items-start max-w-7xl mx-auto px-5 pb-16 lg:pb-0 lg:py-0">
          {badge ? (
            <motion.span
              className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-white backdrop-blur"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {badge}
            </motion.span>
          ) : null}

          <motion.h1
            className="text-4xl md:text-6xl font-semibold text-white drop-shadow-md text-pretty"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {heading}
          </motion.h1>

          <motion.p
            className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 text-pretty"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {subheading}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap  w-full lg:w-fit justify-start md:justify-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href={primaryCtaHref || `/${destination}/contact`}>
              <Button className="bg-primary text-primary-foreground hover:bg-white hover:text-black cursor-pointer">
                {primaryCtaLabel || "Book Your Trip"}
              </Button>
            </Link>
            <Link href={secondaryCtaHref || `/${destination}/gallery`}>
              <Button className="border-white bg-white text-black hover:bg-primary cursor-pointer hover:text-white">
                {secondaryCtaLabel || "Explore Gallery"}
              </Button>
            </Link>
          </motion.div>

          {locationLabel ? (
            <p className="mt-6 flex items-center gap-1.5 text-sm text-white/70">
              <MapPin className="size-4" />
              {locationLabel}
            </p>
          ) : null}
        </div>

        {/* --- Floating gallery preview widget --- */}
        {peekImage ? (
          <div className="absolute bottom-8 right-8 hidden md:block">
            <div className="relative h-24 w-36 overflow-hidden rounded-2xl border-2 border-white/40 shadow-xl">
              <Image src={peekImage} alt="" fill className="object-cover" />
              {heroImages.length > 1 ? (
                <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                  {heroImages.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* --- Optional Gradient Overlay for Text Contrast --- */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* --- Promo ribbon --- */}
      {ribbonText ? (
        <div className="flex flex-col items-center justify-center gap-3 bg-accent px-5 py-3 text-center text-accent-foreground md:flex-row md:justify-between">
          <p className="text-sm font-medium">{ribbonText}</p>
          {ribbonCtaLabel ? (
            <Link href={ribbonCtaHref || `/${destination}/packages`}>
              <Button
                size="sm"
                className="bg-white text-foreground hover:bg-white/90"
              >
                {ribbonCtaLabel}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
