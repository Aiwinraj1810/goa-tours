export type ItineraryDay = {
  day: string;
  title: string;
  description: string;
  image?: string;
};

export type Package = {
  slug: string;
  title: string;
  img: string;
  desc: string;
  longDesc: string;
  details: string;
  itinerary: ItineraryDay[];
};

export const packages: Package[] = [
  {
    slug: "quick-beach-escape",
    title: "3 Days, 2 Nights — Quick Beach Escape",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760686895/pexels-belle-co-99483-1000445_11zon_1_2_aiyarm.webp",
    desc: "Unwind on the golden sands of Baga & Calangute. Perfect for a quick yet soulful Goa retreat.",
    longDesc:
      "Escape the everyday with our 3-day beach retreat crafted for those who want the very best of Goa without the stress of planning. You'll wake up to the sound of waves, spend your days exploring Baga and Calangute's golden shores, and wind down with fresh seafood and a spectacular sunset. Every transfer, stay, and sightseeing stop is arranged for you — all you have to do is show up and breathe in the sea air.",
    details: "Includes airport transfers, resort stay & sightseeing.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Beach Welcome",
        description:
          "Pickup from the airport, check in to your beachside resort, and spend the evening strolling Calangute Beach with a welcome dinner at a local shack.",
      },
      {
        day: "Day 2",
        title: "North Goa Beach Hop",
        description:
          "Explore Baga, Anjuna, and Vagator beaches. Optional water sports at Baga and a visit to the colourful Anjuna flea market in the afternoon.",
        image: "/images/dest-anjuna.jpg",
      },
      {
        day: "Day 3",
        title: "Sunrise & Departure",
        description:
          "Early morning walk on the beach, leisurely breakfast at the resort, and a comfortable transfer to the airport.",
      },
    ],
  },
  {
    slug: "heritage-adventure",
    title: "5 Days, 4 Nights — Heritage & Adventure",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760687485/pexels-urtimud-89-76108288-32262443_11zon_1_brpf4g.webp",
    desc: "Dive into Goa's old-world charm, forts, waterfalls, and river cruises. A complete Goa experience!",
    longDesc:
      "For the traveller who wants it all — sun, history, adventure, and flavour — this 5-day itinerary is Goa at its fullest. From the Portuguese-era basilicas of Old Goa and the clifftop drama of Chapora Fort to the thundering drop of Dudhsagar Falls and the calm of a Mandovi river cruise, every day delivers a different face of this extraordinary destination. Guided by local experts who know the hidden lanes as well as the landmarks.",
    details: "Includes guided tours, breakfast & adventure activities.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Old Goa",
        description:
          "Airport pickup, hotel check-in, and an evening walking tour of Old Goa's UNESCO-listed churches and basilicas.",
      },
      {
        day: "Day 2",
        title: "Forts & Fishing Villages",
        description:
          "Morning visit to Chapora Fort and Vagator, followed by lunch in a traditional fishing village and a sunset Mandovi river cruise.",
        image: "/images/dest-chapora.jpg",
      },
      {
        day: "Day 3",
        title: "Dudhsagar Falls Trek",
        description:
          "Full-day excursion to Dudhsagar Falls through the Western Ghats jungle. Jeep safari and waterfall swim included.",
        image: "/images/dest-dudhsagar.jpg",
      },
      {
        day: "Day 4",
        title: "Spice Plantation & Leisure",
        description:
          "Morning spice farm tour with a traditional Goan lunch. Free afternoon for beach time or shopping at local markets.",
        image: "/images/dest-anjuna.jpg",
      },
      {
        day: "Day 5",
        title: "South Goa & Departure",
        description:
          "Quiet morning at Palolem or Colva Beach, farewell breakfast, and comfortable airport transfer.",
      },
    ],
  },
  {
    slug: "north-goa-weekend",
    title: "Weekend Getaway — North Goa Vibes",
    img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760687301/pexels-ajay-donga-1113836-2174656_11zon_1_fizuwo.webp",
    desc: "Perfect for a spontaneous escape! Explore beaches, shacks & nightlife in North Goa.",
    longDesc:
      "Two days is all you need for a North Goa weekend that feels far longer. This short but action-packed getaway puts you at the heart of Goa's most energetic stretch — sun-soaked beaches, legendary beach shacks, lively markets, and a nightlife scene unlike anywhere else in India. We handle the stay and a scooter so you can move at your own pace and discover your own favourite corners.",
    details: "Includes stay, breakfast & one-day scooter rental.",
    itinerary: [
      {
        day: "Day 1",
        title: "Check-in & Explore",
        description:
          "Arrive at your boutique guesthouse in Anjuna or Vagator. Afternoon at leisure on the beach, evening at a clifftop shack for dinner and live music.",
        image: "/images/dest-anjuna.jpg",
      },
      {
        day: "Day 2",
        title: "Scooter Day & Nightlife",
        description:
          "Pick up your scooter and ride through Mapusa Market, Morjim Beach, and Arambol at your own pace. Evening back in Baga for Goa's famous nightlife strip.",
        image: "/images/dest-nightlife.jpg",
      },
    ],
  },
];

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}
