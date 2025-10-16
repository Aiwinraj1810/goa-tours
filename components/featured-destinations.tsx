"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-balance">Featured Destinations</h2>
        <p className="text-muted-foreground">Handpicked experiences to feel Goa&apos;s heartbeat.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spots.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="overflow-hidden bg-card shadow-sm">
              <div className="relative h-48 w-full">
                <Image
                  src={s.img || "/placeholder.svg"}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
