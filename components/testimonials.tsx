"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Compass, Utensils, Ship } from "lucide-react"

const highlights = [
  {
    title: "Hidden Gems of Goa",
    icon: Compass,
    desc: "Explore secret beaches, serene backwaters, and local-only viewpoints with our experienced guides.",
  },
  {
    title: "Local Cuisine Trails",
    icon: Utensils,
    desc: "Savor authentic Goan flavors—from seafood to bebinca—on curated culinary walks and tastings.",
  },
  {
    title: "Sunset Cruises",
    icon: Ship,
    desc: "Unwind on gentle waters as the sky paints orange and pink—memories you’ll never forget.",
  },
]

export default function Highlights() {
  return (
    <section className="bg-secondary/60">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold text-balance mb-8">Local Highlights</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
               viewport={{ once: true }}
            >
              <Card className="bg-card shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <h.icon className="h-5 w-5 text-accent" />
                    <CardTitle>{h.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground">{h.desc}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
