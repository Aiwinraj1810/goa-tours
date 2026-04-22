"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { packages } from "@/lib/packages";

export default function TourPackages() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary/10 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-semibold">Explore Our Tour Packages</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Choose from curated Goa experiences — from short escapes to week-long
          adventures.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.slug}
            className="group relative overflow-hidden rounded-2xl bg-card shadow-md hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={pkg.img}
                alt={pkg.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 559px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="p-6 text-left">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {pkg.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">{pkg.desc}</p>
              <p className="text-foreground/80 text-xs mb-6">{pkg.details}</p>

              <Link href={`/packages/${pkg.slug}`}>
                <Button className="w-full bg-primary text-primary-foreground hover:opacity-90">
                  View Details
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}

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
            We offer customized tours, family trips, and luxury experiences
            across Goa.
          </p>
          <Link href="/packages">
            <Button className="flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90">
              Explore More <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
