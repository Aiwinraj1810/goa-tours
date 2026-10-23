"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { cn, hasPhoto } from "@/lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
};

const defaultImages: GalleryImage[] = [
  { src: "/images/dest-baga.jpg", alt: "Baga Beach, Goa" },
  { src: "/images/dest-chapora.jpg", alt: "Chapora Fort, Goa" },
  { src: "/images/dest-dudhsagar.jpg", alt: "Dudhsagar Falls, Goa" },
  { src: "/images/dest-bom-jesus.jpg", alt: "Basilica of Bom Jesus, Goa" },
  { src: "/images/dest-anjuna.jpg", alt: "Anjuna Beach, Goa" },
  { src: "/images/dest-nightlife.jpg", alt: "Goa Nightlife" },
  { src: "/images/gallery-7.jpg", alt: "Goa scenery" },
  { src: "/images/gallery-8.jpg", alt: "Goa scenery" },
  { src: "/images/gallery-9.jpg", alt: "Goa scenery" },
];

// ── Layout ───────────────────────────────────────────────────────────────────
// Photographs are set in justified rows: every image in a row shares one height
// and takes a varied share of the 12-column width, so the rhythm changes while
// each row stays balanced. Row heights alternate. The rows are derived from the
// image *count* only, so any number of images composes cleanly (no orphans).
const PATTERNS = [[8, 4], [4, 4, 4], [5, 7], [3, 6, 3], [7, 5], [6, 6]];
const TWO = [7, 5];
const THREE = [4, 4, 4];
const SINGLE = [12];

const SPAN_CLASS: Record<number, string> = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
  7: "md:col-span-7",
  8: "md:col-span-8",
  12: "md:col-span-12",
};
const ROW_HEIGHT = [
  "md:h-[clamp(16rem,33vw,31rem)]",
  "md:h-[clamp(13rem,25vw,23rem)]",
];

type Placement = { span: number; row: number };

function planRows(count: number): Placement[] {
  const out: Placement[] = [];
  let remaining = count;
  let p = 0;
  let row = 0;
  while (remaining > 0) {
    let pattern = PATTERNS[p % PATTERNS.length];
    p += 1;
    if (pattern.length > remaining) {
      pattern = remaining === 1 ? SINGLE : TWO;
    } else if (remaining - pattern.length === 1) {
      // taking this pattern would strand a single image: re-balance instead
      pattern = pattern.length === 2 ? THREE : TWO;
    }
    for (const span of pattern) out.push({ span, row });
    remaining -= pattern.length;
    row += 1;
  }
  return out;
}

export default function GalleryGrid({ images = defaultImages }: { images?: GalleryImage[] }) {
  // Stock placeholder art is not a photograph; leave it out rather than show it.
  const photos = useMemo(() => images.filter((img) => hasPhoto(img.src)), [images]);
  const placements = useMemo(() => planRows(photos.length), [photos.length]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  // The tile that opened the viewer, so focus can return to it on close.
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const open = activeIndex !== null;
  const total = photos.length;

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setActiveIndex((i) => (i !== null ? (i + dir + total) % total : 0));
  };

  // Warm the neighbouring photographs so next/previous feel immediate.
  useEffect(() => {
    if (activeIndex === null || total < 2) return;
    for (const i of [(activeIndex + 1) % total, (activeIndex - 1 + total) % total]) {
      const img = new window.Image();
      img.src = photos[i].src;
    }
  }, [activeIndex, total, photos]);

  if (total === 0) {
    return (
      <p className="measure text-lg text-muted-foreground">
        Photographs are on their way. Please check back soon.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-12 md:gap-4">
        {photos.map((photo, index) => {
          const place = placements[index];
          // Small screens: two columns, with every third photograph given the full width.
          const wideOnPhone = index % 3 === 0;
          return (
            <motion.button
              key={`${index}-${photo.src}`}
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setDirection(1);
                setActiveIndex(index);
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              aria-label={`Open photo ${index + 1} of ${total}${photo.alt ? `: ${photo.alt}` : ""}`}
              className={cn(
                "group relative cursor-zoom-in overflow-hidden rounded-xl bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                wideOnPhone ? "col-span-2 aspect-[4/3]" : "col-span-1 aspect-[3/4]",
                "md:aspect-auto",
                SPAN_CLASS[place.span],
                ROW_HEIGHT[place.row % ROW_HEIGHT.length]
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                // The first row is above the fold; everything else loads lazily.
                priority={index < 3}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </motion.button>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setActiveIndex(null)}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            onCloseAutoFocus={(e) => {
              // Hand focus back to the photograph that opened the viewer.
              e.preventDefault();
              openerRef.current?.focus();
            }}
            className="fixed inset-0 z-50 flex flex-col bg-[#0b0a14] focus:outline-none"
            onKeyDown={(e) => {
              if (total < 2) return;
              if (e.key === "ArrowRight") {
                e.preventDefault();
                go(1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                go(-1);
              }
            }}
          >
            <DialogTitle className="sr-only">Photo viewer</DialogTitle>

            {/* Top bar: close */}
            <div className="flex shrink-0 items-center justify-end px-4 pt-4 md:px-8 md:pt-6">
              <DialogPrimitive.Close
                className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close photo viewer"
              >
                <X className="size-5" />
              </DialogPrimitive.Close>
            </div>

            {/* Photograph: contained at its natural proportions, swipeable */}
            <div className="relative min-h-0 flex-1">
              <AnimatePresence initial={false} custom={direction}>
                {activeIndex !== null ? (
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    className="absolute inset-0 px-4 py-2 [touch-action:pan-y] md:px-28 md:py-4"
                    initial={{ opacity: 0, x: 48 * direction }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -48 * direction }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    drag={total > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -70 || info.velocity.x < -500) go(1);
                      else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
                    }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={photos[activeIndex].src}
                        alt={photos[activeIndex].alt}
                        fill
                        sizes="100vw"
                        draggable={false}
                        className="select-none object-contain"
                        priority
                      />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Side arrows: in the margins, clear of the photograph */}
              {total > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous photo"
                    className="absolute left-6 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next photo"
                    className="absolute right-6 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              ) : null}
            </div>

            {/* Bottom bar: counter (and arrows on small screens) */}
            <div className="flex shrink-0 items-center justify-center gap-6 px-4 pb-5 pt-3 md:pb-6">
              {total > 1 ? (
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="flex size-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
                >
                  <ChevronLeft className="size-6" />
                </button>
              ) : null}
              <span
                aria-live="polite"
                className="min-w-16 text-center text-sm tabular-nums text-white/70"
              >
                {activeIndex !== null ? `${activeIndex + 1} / ${total}` : ""}
              </span>
              {total > 1 ? (
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="flex size-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
                >
                  <ChevronRight className="size-6" />
                </button>
              ) : null}
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
}
