"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const spots = [
  {
    title: "Baga Beach",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-baga_c5zjwb.jpg",
    desc: `Famous for its golden sands, lively shacks, and water sports, Baga Beach is the heartbeat of North Goa. 
           From parasailing under the warm sun to dancing the night away at beachside clubs, Baga offers a blend of thrill and relaxation. 
           The beach is also lined with cafes where you can enjoy Goan seafood as the waves gently roll by.`,
  },
  {
    title: "Chapora Fort",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-chapora_rnpimr.jpg",
    desc: `Perched above the Chapora River, this historic fort offers one of the most breathtaking sunset views in Goa. 
           Made famous by Bollywood, it’s a favorite spot for travelers seeking peace, scenery, and a touch of nostalgia. 
           The panoramic view of the Arabian Sea and the surrounding hills makes it a photographer’s paradise.`,
  },
  {
    title: "Dudhsagar Falls",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-dudhsagar_ypl4ij.jpg",
    desc: `Tucked deep within the lush Western Ghats, Dudhsagar Falls cascades from over 300 meters like a stream of milk. 
           The journey to the falls through forests and spice plantations is as mesmerizing as the destination itself. 
           Whether you view it by train or trek up close, the thundering beauty of this waterfall leaves a lasting impression.`,
  },
  {
    title: "Basilica of Bom Jesus",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-bom-jesus_x2ywr2.jpg",
    desc: `A UNESCO World Heritage Site, the Basilica of Bom Jesus is a timeless monument to Goa’s colonial and spiritual heritage. 
           Built in the late 16th century, it houses the mortal remains of St. Francis Xavier. 
           Its baroque architecture and serene interiors reflect centuries of history and devotion.`,
  },
  {
    title: "Anjuna Flea Market",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-anjuna_f4fecx.jpg",
    desc: `What started as a hippie market decades ago is now one of Goa’s most vibrant shopping experiences. 
           Wander through colorful stalls filled with bohemian jewelry, handmade crafts, and international goods. 
           With live music and beachside vibes, Anjuna Flea Market captures the free-spirited essence of Goan life.`,
  },
  {
    title: "Goa Nightlife",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680037/dest-nightlife_tvdtvx.jpg",
    desc: `As the sun sets, Goa transforms into a world of lights, laughter, and music. 
           From beach clubs pulsing with electronic beats to cozy lounges offering live performances, there’s something for everyone. 
           Experience the famous nightlife of Goa where every evening feels like a celebration by the sea.`,
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 space-y-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-balance">
          Featured Destinations
        </h2>
        <p className="text-muted-foreground">
          Handpicked experiences to feel Goa&apos;s heartbeat.
        </p>
      </div>

      {spots.map((spot, i) => {
        const isReversed = i % 2 !== 0;
        const [firstWord, ...restWords] = spot.title.split(" ");
        const restTitle = restWords.join(" ");

        return (
          <div key={spot.title}>
            <motion.div
              
              className={`flex flex-col md:flex-row items-center  gap-8 md:gap-16 ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image Section with Title Overlay */}
              <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={spot.img}
                  alt={spot.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

                {/* Title Overlay */}
                <h3 className="absolute top-6 left-6 text-4xl md:text-8xl font-semibold text-white drop-shadow-lg">
                  <span className="underline-offset-4 decoration-primary ">
                    {firstWord}
                  </span>{" "}
                  {restTitle}
                </h3>
              </div>

              {/* Text Section (Description Only) */}
              <div className="w-full md:w-1/2 border-t-2 border-b-2 py-4">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {spot.desc}
                </p>
              </div>
            </motion.div>
            <hr className="mt-16" />
          </div>
        );
      })}
    </section>
  );
}
