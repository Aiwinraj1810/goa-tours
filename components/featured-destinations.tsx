"use client";

import HorizontalSlider from "./HorizontalSlider";

export type Spot = {
  title: string;
  img: string;
  desc: string;
};

export const spots: Spot[] = [
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
    <section className="overflow-hidden bg-gradient-to-b from-background via-white to-secondary/20 py-20">
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-primary/80">
          Signature Stops
        </p>
        <h2 className="mt-4 text-4xl font-semibold text-balance md:text-5xl">
          Featured Destinations
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Handpicked experiences to feel Goa&apos;s heartbeat.
        </p>
      </div>
      <HorizontalSlider className="mx-auto max-w-[1800px]" />
    </section>
  );
}
