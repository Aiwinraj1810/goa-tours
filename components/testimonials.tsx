"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const highlights = [
  {
    title: "Hidden Gems of Goa",
    desc: "Explore secret beaches, serene backwaters, and local-only viewpoints with our experienced guides.",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760683736/pexels-saccreation-32983877_wbnnbz.jpg",
  },
  {
    title: "Local Cuisine Trails",
    desc: "Savor authentic Goan flavors—from seafood to bebinca—on curated culinary walks and tastings.",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760684026/5e39708d0043c958a94557b1_1580822669579_jrc5qc.jpg",
  },
  {
    title: "Sunset Cruises",
    desc: "Unwind on gentle waters as the sky paints orange and pink—memories you’ll never forget.",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760684111/pexels-rohit-sharma-1230131-23322244_xyzvj8.jpg",
  },
  {
    title: "Cultural Heritage",
    desc: "Discover the charm of Old Goa through its churches, markets, and colorful Portuguese-inspired streets.",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760684213/pexels-varda-sami-986923434-29202786_weiaai.jpg",
  },
];

export default function Highlights() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-secondary/60 py-16">
      <div className="mx-auto max-w-7xl px-4 mb-8 text-center">
        <h2 className="text-4xl font-semibold text-balance">
          Local Highlights
        </h2>
        <p className="text-muted-foreground mt-2">
          Experience Goa beyond beaches — its people, culture, and flavors.
        </p>
      </div>

      {/* --- Seamless Infinite Marquee --- */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...highlights, ...highlights].map((item, i) => (
            <motion.div
              key={i}
              layout
              className="relative flex-shrink-0 w-[300px] h-[400px] overflow-hidden rounded-2xl shadow-md group cursor-pointer"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)} // toggle overlay for mobile
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
              />

              {/* --- Overlay --- */}
              <div
                className={`
                  absolute inset-0 flex flex-col justify-end p-4 transition-all duration-500
                  bg-black/60 md:opacity-0 md:group-hover:opacity-100
                  ${
                    activeIndex === i ? "opacity-100" : "opacity-0 md:opacity-0"
                  }
                `}
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-white/80 mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
