"use client"
import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

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
]

export default function GalleryGrid() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((src) => (
          <button
            key={src}
            onClick={() => {
              setActive(src)
              setOpen(true)
            }}
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
        ))}
      </div>

      {open && active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 z-10 rounded-md bg-background/80 p-1 text-foreground hover:bg-background"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-[60vh] w-full">
              <Image src={active || "/placeholder.svg"} alt="Goa full" fill className="object-cover" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
