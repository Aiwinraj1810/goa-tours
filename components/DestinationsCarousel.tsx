"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { spots, type Spot } from "./featured-destinations";

type Props = { className?: string };

/* ── Shared inner card content ───────────────────────────── */
function SlideInner({
  spot,
  index,
  isActive,
}: {
  spot: Spot;
  index: number;
  isActive: boolean;
}) {
  return (
    <>
      <Image
        src={spot.img}
        alt={spot.title}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-75"
        }`}
      />

      <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <h3
          className={`font-semibold text-white leading-tight transition-all duration-500 ${
            isActive ? "text-xl md:text-2xl lg:text-3xl mb-3" : "text-sm truncate"
          }`}
        >
          {spot.title}
        </h3>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isActive ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-sm leading-relaxed text-white/80 line-clamp-4">
            {spot.desc.replace(/\s+/g, " ").trim()}
          </p>
        </div>
      </div>
    </>
  );
}

/* ── Main carousel ───────────────────────────────────────── */
export default function DestinationsCarousel({ className = "" }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dragStartX = useRef(0);

  const prev = useCallback(
    () => setSelectedIndex((i) => (i - 1 + spots.length) % spots.length),
    []
  );

  const next = useCallback(
    () => setSelectedIndex((i) => (i + 1) % spots.length),
    []
  );

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 50) delta < 0 ? next() : prev();
  };

  const sharedPointerProps = {
    onPointerDown,
    onPointerUp,
  };

  return (
    <div className={`relative ${className}`}>

      {/* ── Mobile / Tablet  (< lg): one slide at a time ───── */}
      <div
        className="lg:hidden overflow-hidden cursor-grab active:cursor-grabbing select-none"
        {...sharedPointerProps}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out h-[60vh] min-h-[360px] max-h-[600px]"
          style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
        >
          {spots.map((spot, index) => (
            <div
              key={spot.title}
              className="group relative w-full flex-none overflow-hidden rounded-2xl"
            >
              <SlideInner spot={spot} index={index} isActive />
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop (lg+): flex-expand, all slides visible ─── */}
      <div
        className="hidden lg:flex gap-3 h-[70vh] min-h-[420px] max-h-[700px] cursor-grab active:cursor-grabbing select-none"
        {...sharedPointerProps}
      >
        {spots.map((spot, index) => {
          const isActive = index === selectedIndex;
          return (
            <div
              key={spot.title}
              onClick={() => setSelectedIndex(index)}
              className={[
                "group relative min-w-0 overflow-hidden rounded-2xl cursor-pointer",
                "transition-all duration-500 ease-in-out",
                isActive ? "flex-[2]" : "flex-[1]",
              ].join(" ")}
            >
              <SlideInner spot={spot} index={index} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* Prev button */}
      <button
        onClick={prev}
        aria-label="Previous destination"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm text-slate-800 transition-colors hover:bg-white"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Next button */}
      <button
        onClick={next}
        aria-label="Next destination"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm text-slate-800 transition-colors hover:bg-white"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dot indicators */}
      <div className="mt-5 flex justify-center gap-2">
        {spots.map((spot, i) => (
          <button
            key={spot.title}
            onClick={() => setSelectedIndex(i)}
            aria-label={`Go to ${spot.title}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "w-6 bg-primary" : "w-1.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
