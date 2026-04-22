"use client";

import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

type Item = {
  id: string;
  title: string;
  desc: string;
  img: string;
};

function PrevButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-xl text-gray-700 transition hover:bg-gray-100 disabled:opacity-40"
      aria-label="Previous highlight"
    >
      &#8592;
    </button>
  );
}

function NextButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-xl text-gray-700 transition hover:bg-gray-100 disabled:opacity-40"
      aria-label="Next highlight"
    >
      &#8594;
    </button>
  );
}

function usePrevNextButtons(emblaApi?: EmblaCarouselType | null) {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

export default function HighlightsCarousel({ items }: { items: Item[] }) {
  const isCompactSet = items.length < 4;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold">Local Highlights</h2>
        <p className="text-muted-foreground">
          Experience Goa beyond beaches, its people, culture, and flavors.
        </p>
      </div>

      <div className="embla pl-4">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`embla__slide ${
                  isCompactSet
                    ? "min-w-0 flex-[0_0_100%] basis-full"
                    : "flex-[0_0_auto] basis-[260px] sm:basis-[300px] md:basis-[340px]"
                }`}
              >
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <div className="text-sm tracking-[0.3em] text-gray-500">
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </div>
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>

      <div
        className="mt-6 flex justify-center space-x-2"
        role="tablist"
        aria-label="Highlights carousel navigation"
      >
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === selectedIndex ? "bg-black" : "bg-gray-300"
            }`}
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`Go to highlight slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function Card({ item }: { item: Item }) {
  return (
    <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] shadow-lg">
      <Image
        src={item.img}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/70">
          Goa Highlight
        </p>

        <h3 className="text-lg sm:text-xl font-semibold">
          {item.title}
        </h3>

        <p className="mt-2 text-sm text-white/80 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
}
