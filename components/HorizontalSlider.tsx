"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { spots } from "./featured-destinations";

type HorizontalSliderProps = {
  className?: string;
};

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSlider({
  className = "",
}: HorizontalSliderProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - section.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      const trigger = ScrollTrigger.create({
        animation: tween,
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(track, { clearProps: "transform" });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative ${className}`}
    >
      <div
        className="overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] touch-pan-x lg:overflow-visible"
      >
        <div
          ref={trackRef}
          className="mx-auto flex w-max gap-6 px-4 py-6 snap-x snap-mandatory md:px-6 lg:h-screen lg:items-center lg:px-10 lg:snap-none"
        >
          {spots.map((spot, index) => (
            <article
              key={spot.title}
              className="group relative flex min-h-[34rem] w-[min(88vw,24rem)] snap-center flex-none flex-col overflow-hidden rounded-[2rem] border border-white/50 bg-white/85 shadow-[0_20px_60px_rgba(8,122,187,0.12)] backdrop-blur md:w-[28rem] lg:w-[32rem]"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={spot.img}
                  alt={spot.title}
                  fill
                  sizes="(max-width: 768px) 88vw, (max-width: 1024px) 28rem, 32rem"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
                <p className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-primary">
                  Stop {index + 1}
                </p>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold tracking-tight text-balance text-slate-900">
                    {spot.title}
                  </h3>
                  <p className="text-base leading-7 text-slate-600">
                    {spot.desc.replace(/\s+/g, " ").trim()}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-5 text-sm text-slate-500">
                  <span>Curated Goa highlight</span>
                  <span className="font-medium text-primary">Slide to explore</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
