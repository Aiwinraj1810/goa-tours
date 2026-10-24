"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { District, Place } from "@/lib/destinations/types";

type Props = {
  districts: District[];
  destinationLabel: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

// Groups a district's places by their optional category, keeping the order in
// which categories first appear in the CMS. Without categories the list is
// returned untouched and no group headings are shown.
function groupByCategory(places: Place[]) {
  const hasCategories = places.some((p) => p.category?.trim());
  if (!hasCategories) return { ordered: places, hasCategories };
  const groups = new Map<string, Place[]>();
  for (const p of places) {
    const key = p.category?.trim() ?? "";
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  return { ordered: [...groups.values()].flat(), hasCategories };
}

export default function PlacesExplorer({ districts, destinationLabel }: Props) {
  const [activeDistrict, setActiveDistrict] = useState(0);
  const [activePlace, setActivePlace] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  // Region selector: one line that can be dragged/swiped when there are more
  // regions than fit, instead of wrapping onto extra rows.
  const [tabsRef, tabsApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    align: "start",
  });
  const [tabsCanNext, setTabsCanNext] = useState(false);

  useEffect(() => {
    if (!tabsApi) return;
    const sync = () => setTabsCanNext(tabsApi.canScrollNext());
    sync();
    tabsApi.on("scroll", sync).on("reInit", sync).on("select", sync);
    return () => {
      tabsApi.off("scroll", sync).off("reInit", sync).off("select", sync);
    };
  }, [tabsApi]);

  const listRef = useRef<HTMLOListElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const district = districts[activeDistrict];
  const { ordered: places, hasCategories } = useMemo(
    () => groupByCategory(district?.places ?? []),
    [district]
  );

  // Keep the selected spot visible when it changes via the arrows (the list
  // scrolls inside its own box, so move that box rather than the page).
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>("[aria-current='true']")?.closest("li");
    if (!list || !item) return;
    const top = item.offsetTop - list.offsetTop;
    if (top < list.scrollTop || top + item.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: top - 8, behavior: "smooth" });
    }
  }, [activePlace, activeDistrict]);

  if (!district) return null;

  const placeIndex = Math.min(activePlace, Math.max(places.length - 1, 0));
  const place = places[placeIndex];
  const images = place?.images ?? [];
  const image = images[Math.min(activeImage, images.length - 1)];

  function selectDistrict(i: number) {
    tabsApi?.scrollTo(i);
    setActiveDistrict(i);
    setActivePlace(0);
    setActiveImage(0);
  }

  function selectPlace(i: number, reveal = false) {
    setActivePlace(i);
    setActiveImage(0);
    const photo = photoRef.current;
    if (reveal && photo && window.matchMedia("(max-width: 1023px)").matches) {
      const r = photo.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight)
        photo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function step(dir: 1 | -1) {
    selectPlace((placeIndex + dir + places.length) % places.length);
  }

  return (
    <section className="section-y overflow-hidden bg-background">
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-y-12">
        {/* A — heading and region choice, set as part of the content */}
        <div className="gutter lg:col-span-5 lg:row-start-1 lg:pr-14">
          <p className="eyebrow text-primary">Must-visit spots</p>
          <h2 className="text-headline mt-4 text-balance text-foreground">
            Explore {destinationLabel}
          </h2>

          {districts.length > 1 ? (
            <div
              ref={tabsRef}
              className="mt-10 cursor-grab select-none overflow-hidden active:cursor-grabbing [touch-action:pan-y_pinch-zoom]"
              style={
                tabsCanNext
                  ? {
                      maskImage: "linear-gradient(to right, black calc(100% - 3rem), transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to right, black calc(100% - 3rem), transparent)",
                    }
                  : undefined
              }
            >
            <div role="tablist" aria-label="Choose region" className="flex gap-x-8">
              {districts.map((d, i) => {
                const selected = i === activeDistrict;
                return (
                  <button
                    key={d.name}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => selectDistrict(i)}
                    className={cn(
                      "relative shrink-0 whitespace-nowrap pb-2 text-[clamp(1.4rem,2.6vw,2.25rem)] font-semibold leading-none tracking-tight transition-colors",
                      selected ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    {d.name}
                    <sup className="ml-1.5 align-super text-xs font-medium tabular-nums text-muted-foreground">
                      {d.places.length}
                    </sup>
                    {selected ? (
                      <motion.span
                        layoutId="region-underline"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                        transition={{ duration: 0.4, ease }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
            </div>
          ) : (
            <p className="mt-10 text-title text-foreground">{district.name}</p>
          )}
        </div>

        {/* B — featured photograph, bleeding to the right edge on desktop */}
        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div
            ref={photoRef}
            className="relative aspect-[4/5] w-full scroll-mt-20 overflow-hidden bg-secondary sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[28rem] lg:rounded-l-[2.5rem]">
            <AnimatePresence initial={false}>
              <motion.div
                key={`${activeDistrict}-${placeIndex}-${activeImage}`}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.3 } }}
                transition={{ duration: 0.8, ease }}
              >
                {image ? (
                  <Image
                    src={image}
                    alt={place ? `${place.name} — photo ${activeImage + 1}` : ""}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary">
                    <MapPin className="size-10 text-primary/30" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

            {place ? (
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-[var(--gutter)] text-white lg:pr-[var(--gutter)]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${activeDistrict}-${placeIndex}`}
                    className="max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <p className="eyebrow mb-3 text-white/75">
                      {district.name}
                      {place.category ? ` · ${place.category}` : ""} ·{" "}
                      {String(placeIndex + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-title">{place.name}</h3>
                    {images.length > 1 ? (
                      <div className="mt-4 flex gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            aria-label={`Photo ${i + 1}`}
                            onClick={() => setActiveImage(i)}
                            className={cn(
                              "h-0.5 transition-all",
                              i === activeImage ? "w-8 bg-white" : "w-4 bg-white/50"
                            )}
                          />
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                {places.length > 1 ? (
                  <div className="flex shrink-0 gap-2">
                    <button
                      aria-label="Previous spot"
                      onClick={() => step(-1)}
                      className="flex size-10 items-center justify-center rounded-full border border-white/50 transition-colors hover:bg-white hover:text-black"
                    >
                      <ArrowLeft className="size-4" />
                    </button>
                    <button
                      aria-label="Next spot"
                      onClick={() => step(1)}
                      className="flex size-10 items-center justify-center rounded-full border border-white/50 transition-colors hover:bg-white hover:text-black"
                    >
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {/* C — numbered index */}
        <div className="gutter lg:col-span-5 lg:row-start-2 lg:pr-14">
          {places.length > 0 ? (
            <ol
              ref={listRef}
              className="relative max-h-[26rem] overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin] lg:h-[min(62vh,580px)] lg:max-h-none"
            >
              {places.map((p, i) => {
                const selected = i === placeIndex;
                const category = p.category?.trim() ?? "";
                const startsGroup =
                  hasCategories && (i === 0 || (places[i - 1].category?.trim() ?? "") !== category);
                return (
                  <Fragment key={`${p.name}-${i}`}>
                  {startsGroup && category ? (
                    <li
                      role="presentation"
                      className="eyebrow bg-background pb-3 pt-6 text-primary first:pt-0"
                    >
                      {category}
                    </li>
                  ) : null}
                  <li className="border-t border-border last:border-b">
                    <button
                      onClick={() => selectPlace(i, true)}
                      aria-current={selected}
                      className="group flex w-full items-baseline gap-5 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "w-7 shrink-0 text-sm tabular-nums transition-colors",
                          selected ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block text-xl transition-all md:text-2xl",
                            selected
                              ? "translate-x-1 font-semibold text-foreground"
                              : "text-foreground/60 group-hover:text-foreground"
                          )}
                        >
                          {p.name}
                        </span>
                        <AnimatePresence initial={false}>
                          {selected && p.description ? (
                            <motion.span
                              key="desc"
                              className="block overflow-hidden"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease }}
                            >
                              <span className="mt-2 block translate-x-1 text-sm text-muted-foreground md:text-base">
                                {p.description}
                              </span>
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </span>
                      <ArrowRight
                        className={cn(
                          "size-4 shrink-0 text-primary transition-all",
                          selected ? "opacity-100" : "-translate-x-2 opacity-0"
                        )}
                      />
                    </button>
                  </li>
                  </Fragment>
                );
              })}
            </ol>
          ) : (
            <p className="text-muted-foreground">No spots added for {district.name} yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
