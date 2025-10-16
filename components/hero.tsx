"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-9.jpg",
];

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-background"
      aria-label="Goa beach hero"
    >
      <div className="grid md:grid-cols-2 items-center max-w-7xl mx-auto px-4 py-20 gap-8 border-gray-200 border-2 rounded-2xl">
        {/* --- Image Carousel --- */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Carousel
            plugins={[Autoplay({ delay: 4000  })]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((src, i) => (
                <CarouselItem key={i} className="relative aspect-[4/3]">
                  <Image
                    src={src}
                    alt={`Goa view ${i + 1}`}
                    fill
                    className="object-cover rounded-2xl"
                    priority={i === 0}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 bg-background/60 backdrop-blur-sm hover:bg-background/90" />
            <CarouselNext className="right-3 bg-background/60 backdrop-blur-sm hover:bg-background/90" />
          </Carousel>
        </div>

        {/* --- Text Section --- */}
        <div className="relative z-10 text-center md:text-left">
          <motion.h1
            className="text-balance text-4xl font-semibold md:text-6xl drop-shadow-sm"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover the Soul of Goa — Sun, Sand & Serenity
          </motion.h1>

          <motion.p
            className="mt-4 max-w-2xl text-pretty text-lg md:text-xl text-foreground"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Goa Awaits — Where Every Sunset Tells a Story. Feel the Breeze,
            Taste the Sea, Love Goa.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center md:justify-start gap-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/contact">
              <Button className="bg-primary text-primary-foreground hover:opacity-90">
                Book Your Trip
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-secondary bg-transparent"
              >
                Explore Gallery
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
