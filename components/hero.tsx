"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section
      className="relative isolate"
      style={{
        backgroundImage: 'url("/images/hero.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Goa beach hero"
    >
      <div className="absolute inset-0 bg-background/40" />
      <div className="relative mx-auto max-w-6xl px-4 py-28 md:py-40">
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
          Goa Awaits — Where Every Sunset Tells a Story. Feel the Breeze, Taste the Sea, Love Goa.
        </motion.p>
        <motion.div
          className="mt-8 flex gap-3"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/contact">
            <Button className="bg-primary text-primary-foreground hover:opacity-90">Book Your Trip</Button>
          </Link>
          <Link href="/gallery">
            <Button variant="outline" className="border-primary text-primary hover:bg-secondary bg-transparent">
              Explore Gallery
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
