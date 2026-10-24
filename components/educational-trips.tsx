"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Reveal from "@/components/reveal";
import { cn } from "@/lib/utils";

export type EducationalTripsLayout =
  | "hero"
  | "feature"
  | "list"
  | "story"
  | "story-reverse"
  | "closing";

type Highlight = { title: string; text: string };

type Props = {
  layout: EducationalTripsLayout;
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  /** Extra photographs; with two or more the image area becomes a carousel. */
  images?: string[];
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  highlights: Highlight[];
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Photograph with a quiet wipe-in; a plain navy panel stands in until one is supplied. */
function Media({
  src,
  alt,
  sizes,
  className,
  children,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("relative overflow-hidden bg-navy", className)}
      initial={reduce ? false : { clipPath: "inset(0 0 0 100%)" }}
      whileInView={{ clipPath: "inset(0 0 0 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : null}
      {children}
    </motion.div>
  );
}

/**
 * Photograph area for the feature and story layouts. One image (or none) is
 * shown as-is; two or more become a swipeable carousel with arrows, progress
 * dashes and a slow autoplay that stops once the visitor interacts.
 */
function Carousel({
  images,
  alt,
  sizes,
  className,
}: {
  images: string[];
  alt: string;
  sizes: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const many = images.length > 1;
  const plugins = useMemo(
    () =>
      many && !reduce
        ? [Autoplay({ delay: 6000, stopOnInteraction: true, stopOnMouseEnter: true })]
        : [],
    [many, reduce]
  );
  const [viewportRef, api] = useEmblaCarousel({ loop: many, watchDrag: many }, plugins);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => setIndex(api.selectedScrollSnap());
    sync();
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api]);

  const go = useCallback(
    (dir: 1 | -1) => {
      api?.plugins().autoplay?.stop();
      if (dir === 1) api?.scrollNext();
      else api?.scrollPrev();
    },
    [api]
  );

  return (
    <motion.div
      className={cn("relative overflow-hidden bg-navy", className)}
      initial={reduce ? false : { clipPath: "inset(0 0 0 100%)" }}
      whileInView={{ clipPath: "inset(0 0 0 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease }}
      role={many ? "region" : undefined}
      aria-roledescription={many ? "carousel" : undefined}
      aria-label={many ? alt : undefined}
    >
      <div ref={viewportRef} className="absolute inset-0 overflow-hidden [touch-action:pan-y_pinch-zoom]">
        <div className="flex h-full">
          {images.map((src, i) => (
            <div
              key={src + i}
              className="relative h-full min-w-0 flex-[0_0_100%]"
              role={many ? "group" : undefined}
              aria-roledescription={many ? "slide" : undefined}
              aria-label={many ? `${i + 1} of ${images.length}` : undefined}
            >
              <Image
                src={src}
                alt={many && i !== index ? "" : alt}
                fill
                sizes={sizes}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {many ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-[var(--gutter)] pt-0 text-white">
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => {
                    api?.plugins().autoplay?.stop();
                    api?.scrollTo(i);
                  }}
                  className="flex h-6 items-end"
                >
                  <span
                    className={cn(
                      "block h-0.5 transition-all",
                      i === index ? "w-8 bg-white" : "w-4 bg-white/50"
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => go(-1)}
                className="flex size-11 items-center justify-center rounded-full border border-white/50 transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => go(1)}
                className="flex size-11 items-center justify-center rounded-full border border-white/50 transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </motion.div>
  );
}

function Cta({
  label,
  href,
  tone = "primary",
}: {
  label: string;
  href: string;
  tone?: "primary" | "light";
}) {
  if (!label || !href) return null;
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-12 w-fit items-center gap-2 rounded-full px-7 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2",
        tone === "primary"
          ? "bg-primary text-primary-foreground focus-visible:outline-primary"
          : "bg-navy-foreground text-navy focus-visible:outline-navy-foreground"
      )}
    >
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function Highlights({ items, columns = false }: { items: Highlight[]; columns?: boolean }) {
  const list = items.filter((h) => h.title || h.text);
  if (list.length === 0) return null;
  return (
    <ul className={cn("mt-8 border-t border-border", columns && "grid sm:grid-cols-2 sm:gap-x-10")}>
      {list.map((h, i) => (
        <li key={i} className="border-b border-border py-4">
          {h.title ? <p className="font-semibold text-foreground">{h.title}</p> : null}
          {h.text ? <p className="mt-1 text-sm text-muted-foreground">{h.text}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function Head({
  eyebrow,
  heading,
  description,
  as: Tag = "h2",
  className,
}: {
  eyebrow: string;
  heading: string;
  description?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
      {heading ? (
        <Tag className="text-headline mt-4 text-balance text-foreground">{heading}</Tag>
      ) : null}
      {description ? (
        <p className="measure mt-6 text-lg text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export default function EducationalTrips(props: Props) {
  const { layout, eyebrow, heading, description, image, imageAlt, ctaLabel, ctaHref, highlights } =
    props;
  const alt = imageAlt || heading;
  // The carousel list wins; the single image field still works on its own.
  const gallery = (props.images ?? []).filter(Boolean);
  const photos = gallery.length > 0 ? gallery : image ? [image] : [];

  if (layout === "hero") {
    return (
      <section className="gutter pb-[clamp(2rem,4vw,4rem)]">
        <Media
          src={image}
          alt={alt}
          sizes="100vw"
          className="wide h-[min(80svh,46rem)] min-h-[28rem] rounded-[2rem]"
        >
          {image ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/70 to-transparent" />
          ) : null}
          {/* text sits over the lower part of the photograph */}
          <div className="absolute inset-x-0 bottom-0 max-w-3xl p-[clamp(1.5rem,4vw,4rem)] text-white">
            {eyebrow ? <p className="eyebrow text-white/75">{eyebrow}</p> : null}
            {heading ? (
              <h1 className="text-display mt-4 text-balance [text-shadow:0_1px_24px_rgb(0_0_0/0.35)]">
                {heading}
              </h1>
            ) : null}
            {description ? (
              <p className="mt-6 max-w-xl text-lg text-white/85">{description}</p>
            ) : null}
            <div className="mt-8">
              <Cta label={ctaLabel} href={ctaHref} tone="light" />
            </div>
          </div>
        </Media>
      </section>
    );
  }

  if (layout === "list") {
    const items = highlights.filter((h) => h.title || h.text);
    return (
      <section className="section-y bg-muted">
        <div className="gutter wide grid gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Head eyebrow={eyebrow} heading={heading} description={description} />
            <div className="mt-8">
              <Cta label={ctaLabel} href={ctaHref} />
            </div>
          </Reveal>
          {items.length > 0 ? (
            <ol className="border-t border-foreground/20 lg:col-span-6 lg:col-start-7">
              {items.map((h, i) => (
                <li key={i} className="border-b border-border">
                  <Reveal delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-x-4 py-6">
                    <span className="pt-1 text-sm tabular-nums text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-title text-balance">{h.title}</h3>
                      {h.text ? <p className="mt-2 text-muted-foreground">{h.text}</p> : null}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </section>
    );
  }

  if (layout === "closing") {
    return (
      <section className="section-y bg-navy text-navy-foreground">
        <div className="gutter wide grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal className="lg:col-span-7">
            {eyebrow ? <p className="eyebrow text-navy-foreground/70">{eyebrow}</p> : null}
            {heading ? (
              <h2 className="text-headline mt-4 text-balance">{heading}</h2>
            ) : null}
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            {description ? (
              <p className="measure text-lg text-navy-foreground/75">{description}</p>
            ) : null}
            <div className="mt-8">
              <Cta label={ctaLabel} href={ctaHref} tone="light" />
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  if (layout === "story" || layout === "story-reverse") {
    const reverse = layout === "story-reverse";
    const hasPhotos = photos.length > 0;
    const copy = (
      <Reveal className={cn(!hasPhotos && "lg:col-span-6 lg:col-start-7")}>
        {hasPhotos ? (
          <Head eyebrow={eyebrow} heading={heading} description={description} />
        ) : (
          <>
            {description ? (
              <p className="measure text-lg text-muted-foreground">{description}</p>
            ) : null}
          </>
        )}
        <Highlights items={highlights} />
        <div className="mt-8">
          <Cta label={ctaLabel} href={ctaHref} />
        </div>
      </Reveal>
    );

    if (!hasPhotos) {
      // Text-only: heading and copy sit on an asymmetric two-part grid.
      return (
        <section className="bg-background py-[clamp(3rem,6vw,6rem)]">
          <div className="gutter wide grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <Head eyebrow={eyebrow} heading={heading} />
            </Reveal>
            {copy}
          </div>
        </section>
      );
    }

    return (
      <section className="overflow-hidden bg-background py-[clamp(3rem,6vw,6rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
          <Carousel
            images={photos}
            alt={alt}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className={cn(
              "aspect-[4/5] w-full sm:aspect-[5/4] lg:col-span-7 lg:aspect-[4/3]",
              reverse
                ? "lg:order-2 lg:col-start-6 lg:rounded-l-[2.5rem]"
                : "lg:rounded-r-[2.5rem]"
            )}
          />
          <div
            className={cn(
              "gutter lg:col-span-5",
              reverse ? "lg:order-1 lg:col-start-1 lg:row-start-1 lg:pr-14" : "lg:pl-14"
            )}
          >
            {copy}
          </div>
        </div>
      </section>
    );
  }

  // feature (default): asymmetric — copy left, photograph bleeding off the right edge.
  return (
    <section className="overflow-hidden bg-background section-y">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-0">
        <Carousel
          images={photos}
          alt={alt}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="order-first aspect-[4/5] w-full sm:aspect-[5/4] lg:order-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:aspect-[4/5] lg:max-h-[44rem] lg:rounded-l-[2.5rem]"
        />
        <Reveal className="gutter lg:col-span-5 lg:row-start-1 lg:pr-14">
          <Head eyebrow={eyebrow} heading={heading} description={description} />
          <Highlights items={highlights} />
          <div className="mt-8">
            <Cta label={ctaLabel} href={ctaHref} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
