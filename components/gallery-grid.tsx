"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

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
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {images.map((src) => (
        <Dialog key={src} onOpenChange={(open) => !open && setActive(null)}>
          
          <DialogTrigger asChild>
            <button
              onClick={() => setActive(src)}
              className="group relative overflow-hidden rounded-lg bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open image"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={src || "/placeholder.svg"}
                  alt="Goa scene"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </button>
          </DialogTrigger>

          {/* --- Modal --- */}
          <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-transparent">
            <DialogTitle></DialogTitle>
            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
              {/* ✅ DialogClose ensures the modal actually closes */}
              <DialogClose asChild>
                <button
                  className="absolute right-4 top-4 z-10 rounded-md bg-black/50 p-2 text-white hover:bg-black/70 transition"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>
              </DialogClose>

              {/* Full Image */}
              <Image
                src={active || "/placeholder.svg"}
                alt="Goa full"
                fill
                className="object-cover"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
