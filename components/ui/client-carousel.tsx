"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn, hasPhoto } from "@/lib/utils";

type Testimonial = {
  name: string;
  title?: string;
  avatar?: string;
  text: string;
};

const AUTOPLAY_MS = 8000;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^\p{L}/u.test(word))
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Shows the supplied photograph, or initials if there is none or it fails to load.
function Avatar({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false);
  if (!hasPhoto(src) || failed) {
    return (
      <span
        aria-hidden
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
      >
        {getInitials(name)}
      </span>
    );
  }
  return (
    <Image
      src={src}
      alt=""
      width={44}
      height={44}
      onError={() => setFailed(true)}
      className="size-11 shrink-0 rounded-full object-cover"
    />
  );
}

type ClientCarouselProps = {
  testimonials: Testimonial[];
};

export function ClientCarousel({ testimonials }: ClientCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 40,
        },
      },
    },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
  }, []);

  // Advances slowly enough to read, and stops while someone is hovering,
  // focusing or interacting with it, or if they prefer reduced motion.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [instanceRef, paused, reducedMotion]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={sliderRef}
        className="keen-slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
      >
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="keen-slider__slide flex"
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${idx + 1} of ${testimonials.length}`}
          >
            <figure className="flex w-full flex-col border-t border-foreground/20 pt-8">
              <blockquote className="text-[clamp(1.05rem,1.45vw,1.3rem)] leading-[1.65] text-foreground">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4 pt-8">
                <Avatar name={t.name} src={t.avatar} />
                <span>
                  <span className="block font-semibold text-foreground">{t.name}</span>
                  {t.title ? (
                    <span className="block text-sm text-muted-foreground">{t.title}</span>
                  ) : null}
                </span>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      {/* Quiet controls */}
      {testimonials.length > 1 ? (
        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-1" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((t, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === currentSlide}
                aria-label={`Show testimonial from ${t.name}`}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className="group flex h-8 items-center px-1 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "block h-0.5 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2",
                    idx === currentSlide
                      ? "w-8 bg-foreground"
                      : "w-4 bg-foreground/25 group-hover:bg-foreground/50"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => instanceRef.current?.prev()}
              className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => instanceRef.current?.next()}
              className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
