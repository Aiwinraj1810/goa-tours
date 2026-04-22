import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { Skeleton } from "@/components/ui/skeleton";
import type { Spot } from "@/components/featured-destinations";

type FeaturedCardProps = {
  spot: Spot;
  index: number;
};

export function FeaturedCard({ spot, index }: FeaturedCardProps) {
  const isReversed = index % 2 !== 0;

  const [firstWord, ...restWords] = spot.title.split(" ");
  const restTitle = restWords.join(" ");

  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <motion.div
        className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
          isReversed ? "md:flex-row-reverse" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-md">
          {!loaded && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
          )}

          <Image
            src={spot.img}
            alt={spot.title}
            fill
            onLoad={() => setLoaded(true)}
            className={`object-cover transition-transform duration-700 hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

          <h3 className="absolute top-6 left-6 text-4xl md:text-8xl font-semibold text-white drop-shadow-lg">
            <span className="underline-offset-4 decoration-primary">
              {firstWord}
            </span>{" "}
            {restTitle}
          </h3>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 border-t-2 border-b-2 py-4">
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {spot.desc}
          </p>
        </div>
      </motion.div>

      <hr className="mt-16" />
    </div>
  );
}
