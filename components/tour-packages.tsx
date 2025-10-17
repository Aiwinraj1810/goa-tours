"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const packages = [
  {
    title: "3 Days, 2 Nights — Quick Beach Escape",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760683027/pexels-belle-co-99483-1000445_pz22cc.jpg",
    desc: "Unwind on the golden sands of Baga & Calangute. Perfect for a quick yet soulful Goa retreat.",
    details: "Includes airport transfers, resort stay & sightseeing.",
  },
  {
    title: "5 Days, 4 Nights — Heritage & Adventure",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760683137/pexels-urtimud-89-76108288-32262443_hkxvjg.jpg",
    desc: "Dive into Goa’s old-world charm, forts, waterfalls, and river cruises. A complete Goa experience!",
    details: "Includes guided tours, breakfast & adventure activities.",
  },
  {
    title: "Weekend Getaway — North Goa Vibes",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760683256/pexels-ajay-donga-1113836-2174656_jalwo5.jpg",
    desc: "Perfect for a spontaneous escape! Explore beaches, shacks & nightlife in North Goa.",
    details: "Includes stay, breakfast & one-day scooter rental.",
  },
];

export default function TourPackages() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary/10 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-semibold">Explore Our Tour Packages</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Choose from curated Goa experiences — from short escapes to week-long adventures.
        </p>
      </div>

      {/* --- Card Grid Layout --- */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.title}
            className="group relative overflow-hidden rounded-2xl bg-card shadow-md hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={pkg.img}
                alt={pkg.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div> */}
            </div>

            {/* Text Content */}
            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {pkg.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">{pkg.desc}</p>
              <p className="text-foreground/80 text-xs mb-6">{pkg.details}</p>

              <Link href="/contact">
                <Button className="w-full bg-primary text-primary-foreground hover:opacity-90">
                  Enquire Now
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}

        {/* --- Explore More Card --- */}
        <motion.div
          className="flex col-span-full flex-col justify-center items-center text-center p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/30 border border-primary/20 hover:border-primary/40 transition-all shadow-md hover:shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-primary mb-3">
            Want More Packages?
          </h3>
          <p className="text-muted-foreground mb-6">
            We offer customized tours, family trips, and luxury experiences across Goa.
          </p>
          <Link href="/contact">
            <Button className="flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90">
              Explore More <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
