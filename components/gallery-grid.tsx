"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogPortal, DialogOverlay, DialogTitle } from "@/components/ui/dialog";

const images = [
  "/images/dest-baga.jpg",
  "/images/dest-chapora.jpg",
  "/images/dest-dudhsagar.jpg",
  "/images/dest-bom-jesus.jpg",
  "/images/dest-anjuna.jpg",
  "/images/dest-nightlife.jpg",
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-9.jpg",
];

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const prev = () =>
    setActiveIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : 0));

  const next = () =>
    setActiveIndex((i) => (i !== null ? (i + 1) % images.length : 0));

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={src}
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-lg bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Open image"
          >
            <div className="relative h-48 w-full">
              <Image
                src={src}
                alt="Goa scene"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content className="fixed inset-0 z-50 bg-black flex flex-col focus:outline-none">
            <DialogTitle className="sr-only">Image preview</DialogTitle>

            {/* Close */}
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/25 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image */}
            <div className="relative flex-1 w-full">
              {activeIndex !== null && (
                <Image
                  src={images[activeIndex]}
                  alt="Goa full"
                  fill
                  className="object-contain"
                  priority
                />
              )}

              {/* Prev */}
              <button
                onClick={prev}
                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Next */}
              <button
                onClick={next}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Counter */}
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tabular-nums">
                {activeIndex !== null ? `${activeIndex + 1} / ${images.length}` : ""}
              </span>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
}
