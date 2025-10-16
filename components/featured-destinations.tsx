"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const spots = [
  { title: "Baga Beach", img: "/images/dest-baga.jpg", desc: "Vibrant shoreline with water sports and shacks." },
  { title: "Chapora Fort", img: "/images/dest-chapora.jpg", desc: "Iconic sunsets with sweeping coastal views." },
  {
    title: "Dudhsagar Falls",
    img: "/images/dest-dudhsagar.jpg",
    desc: "Majestic cascading waterfall amidst the forest.",
  },
  { title: "Basilica of Bom Jesus", img: "/images/dest-bom-jesus.jpg", desc: "UNESCO heritage site rich in history." },
  { title: "Anjuna Flea Market", img: "/images/dest-anjuna.jpg", desc: "Bohemian vibe with local crafts and foods." },
  { title: "Goa Nightlife", img: "/images/dest-nightlife.jpg", desc: "Beach clubs and live music under the stars." },
]

export default function FeaturedDestinations() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 space-y-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-balance">Featured Destinations</h2>
        <p className="text-muted-foreground">
          Handpicked experiences to feel Goa&apos;s heartbeat.
        </p>
      </div>

      {spots.map((spot, i) => {
        const isReversed = i % 2 !== 0
        return (
          <motion.div
            key={spot.title}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
              isReversed ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-md">
              <Image
                src={spot.img}
                alt={spot.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2">
              <h3 className="text-5xl font-semibold mb-4">{spot.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{spot.desc}</p>
            </div>
          </motion.div>
        )
      })}
    </section>
  )
}
