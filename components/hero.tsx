"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
      className="relative isolate overflow-hidden h-[90vh] w-full bg-background"
      aria-label="Goa beach hero"
    >
      {/* --- Background Carousel --- */}
      <div className="absolute inset-0">
        <Carousel
          plugins={[Autoplay({ delay: 7000 })]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="h-full w-full"
        >
          <CarouselContent>
            {images.map((src, i) => (
              <CarouselItem key={i} className="relative h-[100vh]">
                <Image
                  src={src}
                  alt={`Goa view ${i + 1}`}
                  fill
                  className="object-cover brightness-[0.55]"
                  priority={i === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* --- Overlay Text --- */}
      <div className="relative z-10 flex h-full flex-col justify-end items-start max-w-7xl mx-auto px-5 py-10 lg:px-0 lg:py-10">
        <motion.h1
          className="text-4xl md:text-6xl font-semibold text-white drop-shadow-md text-pretty"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Discover the Soul of Goa — Sun, Sand & Serenity
        </motion.h1>

        <motion.p
          className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 text-pretty"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Goa Awaits — Where Every Sunset Tells a Story. Feel the Breeze, Taste
          the Sea, Love Goa.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap  w-full lg:w-fit justify-center gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link href="/contact">
            <Button className="bg-primary text-primary-foreground hover:opacity-90">
              Book Your Trip
            </Button>
          </Link>
          <Link href="/gallery">
            <Button
              variant="outline"
              className="border-white bg-white text-black hover:bg-primary cursor-pointer hover:text-white"
            >
              Explore Gallery
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* --- Optional Gradient Overlay for Text Contrast --- */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </section>
  );
}
