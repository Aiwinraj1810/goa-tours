import type { DestinationContent } from "@/lib/destinations/types";

export const goaContent: DestinationContent = {
  hero: {
    heading: "Discover the Soul of Goa",
    subheading: "Sun, Sand & Serenity — Crafted by Locals",
    images: [
      "https://res.cloudinary.com/dur23cis9/image/upload/v1760686895/pexels-belle-co-99483-1000445_11zon_1_2_aiyarm.webp",
      "https://res.cloudinary.com/dur23cis9/image/upload/v1760687485/pexels-urtimud-89-76108288-32262443_11zon_1_brpf4g.webp",
      "https://res.cloudinary.com/dur23cis9/image/upload/v1760687301/pexels-ajay-donga-1113836-2174656_11zon_1_fizuwo.webp",
    ],
  },

  activities: [
    {
      title: "Beach Hopping",
      description:
        "Explore the iconic stretches of Baga, Calangute, Anjuna, and the tranquil shores of Morjim — each beach with its own personality and vibe.",
      image: "/images/dest-baga.jpg",
    },
    {
      title: "Old Goa Heritage Tour",
      description:
        "Walk through the UNESCO World Heritage Site of Old Goa, home to the Basilica of Bom Jesus, Sé Cathedral, and centuries-old Portuguese architecture.",
      image: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-bom-jesus_x2ywr2.jpg",
    },
    {
      title: "Dudhsagar Falls Trek",
      description:
        "Journey through the Western Ghats jungle to Goa's spectacular four-tiered waterfall — one of India's tallest, best experienced after the monsoon.",
      image: "/images/dest-dudhsagar.jpg",
    },
    {
      title: "Spice Plantation Tour",
      description:
        "Wander through fragrant spice farms in the Goan hinterland, learn about cinnamon, cardamom, and vanilla, and sit down to a traditional Goan thali lunch.",
      image: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-anjuna_f4fecx.jpg",
    },
    {
      title: "Sunset River Cruise",
      description:
        "Set sail on the Mandovi River as the sun dips below the horizon, with live Goan folk music, cocktails, and views of the Old Goa skyline.",
      image: "https://res.cloudinary.com/dur23cis9/image/upload/v1760686895/pexels-belle-co-99483-1000445_11zon_1_2_aiyarm.webp",
    },
    {
      title: "Water Sports at Baga",
      description:
        "Try parasailing, jet skiing, banana boat rides, and more at Baga Beach — Goa's water sports hub with certified operators and equipment.",
      image: "https://res.cloudinary.com/dur23cis9/image/upload/v1760687301/pexels-ajay-donga-1113836-2174656_11zon_1_fizuwo.webp",
    },
    {
      title: "Chapora Fort & Vagator",
      description:
        "Hike up to the 17th-century Chapora Fort for panoramic clifftop views of the Arabian Sea, then wind down at one of Vagator's clifftop beach shacks.",
      image: "/images/dest-chapora.jpg",
    },
  ],

  districts: [
    {
      name: "North Goa",
      places: [
        {
          name: "Calangute",
          description: "The Queen of Goa's beaches — lively, wide, and always buzzing.",
          images: [
            "/images/dest-baga.jpg",
            "https://res.cloudinary.com/dur23cis9/image/upload/v1760687301/pexels-ajay-donga-1113836-2174656_11zon_1_fizuwo.webp",
          ],
        },
        {
          name: "Baga Beach",
          description: "Famous for beach shacks, water sports, and an electric nightlife strip.",
          images: ["/images/dest-baga.jpg", "/images/gallery-7.jpg"],
        },
        {
          name: "Anjuna",
          description: "Bohemian vibes, a legendary flea market, and rocky clifftop views.",
          images: [
            "/images/dest-anjuna.jpg",
            "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-anjuna_f4fecx.jpg",
          ],
        },
        {
          name: "Vagator",
          description: "Dramatic red cliffs, a crescent bay, and a laidback sunset scene.",
          images: ["/images/dest-chapora.jpg", "/images/gallery-8.jpg"],
        },
        {
          name: "Morjim",
          description: "Quiet turtle-nesting beach known for its calm waters and driftwood cafes.",
          images: ["/images/gallery-9.jpg"],
        },
      ],
    },
    {
      name: "South Goa",
      places: [
        {
          name: "Palolem",
          description: "A crescent-shaped bay fringed by coconut palms — South Goa's most scenic beach.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Colva",
          description: "A long, wide stretch of white sand popular with families and domestic travellers.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Benaulim",
          description: "A quiet fishing village beach with a relaxed pace and beautiful sunsets.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Cabo de Rama",
          description: "A ruined Portuguese fort perched above the sea, with sweeping coastal views.",
          images: ["/placeholder.svg"],
        },
      ],
    },
    {
      name: "Old Goa",
      places: [
        {
          name: "Basilica of Bom Jesus",
          description: "A UNESCO World Heritage church housing the mortal remains of St Francis Xavier.",
          images: [
            "/images/dest-bom-jesus.jpg",
            "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-bom-jesus_x2ywr2.jpg",
          ],
        },
        {
          name: "Sé Cathedral",
          description: "Asia's largest church in Portuguese Baroque style, built in the 16th century.",
          images: ["/images/dest-bom-jesus.jpg"],
        },
        {
          name: "Church of St Francis of Assisi",
          description: "A beautifully preserved baroque church with an adjacent museum of Christian art.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Goa State Museum",
          description: "Home to a rich collection of Goan art, sculpture, and natural history exhibits.",
          images: ["/placeholder.svg"],
        },
      ],
    },
    {
      name: "Panaji",
      places: [
        {
          name: "Fontainhas",
          description: "Goa's colourful Latin Quarter — tiled heritage houses and narrow winding lanes.",
          images: ["/images/gallery-7.jpg"],
        },
        {
          name: "Miramar Beach",
          description: "Panaji's closest beach, golden at sunset, with a promenade perfect for evening walks.",
          images: ["/images/gallery-8.jpg"],
        },
        {
          name: "Dona Paula",
          description: "A scenic headland at the confluence of the Mandovi and Zuari rivers.",
          images: ["/images/gallery-9.jpg"],
        },
        {
          name: "Reis Magos Fort",
          description: "A 16th-century fort restored as a cultural centre with river views from its ramparts.",
          images: ["/placeholder.svg"],
        },
      ],
    },
  ],

  transport: [
    {
      name: "Manohar International Airport",
      location: "Mopa, North Goa",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=Manohar+International+Airport+Mopa+Goa&t=&z=13&ie=UTF8&iwloc=&output=embed",
      description:
        "Goa's primary international airport, inaugurated in 2023 and located near Mopa in North Goa. It handles all major domestic and international flights. Pre-booked transfers from the airport take approximately 45–60 minutes to most North Goa beach resorts.",
    },
    {
      name: "Madgaon Railway Station",
      location: "Margao, South Goa",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=Madgaon+Railway+Station+Margao+Goa&t=&z=15&ie=UTF8&iwloc=&output=embed",
      description:
        "The principal railway junction of Goa, connecting the state to Mumbai, Delhi, Bengaluru, and all major Indian cities via the Konkan Railway. Located in Margao (South Goa), it is well connected to all parts of the state by taxi and local bus services.",
    },
    {
      name: "KTC Bus Terminal, Panaji",
      location: "Panaji, North Goa",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=KTC+Bus+Stand+Panaji+Goa&t=&z=15&ie=UTF8&iwloc=&output=embed",
      description:
        "The Kadamba Transport Corporation (KTC) operates Goa's state bus network from its main terminal in Panaji. Buses connect all districts within Goa and run inter-state services to Mumbai, Pune, Bengaluru, and Kolhapur at affordable fares.",
    },
    {
      name: "Mandovi River Ferry",
      location: "Panaji Ferry Wharf",
      mapEmbedUrl:
        "https://maps.google.com/maps?q=Panaji+Ferry+Wharf+Goa&t=&z=15&ie=UTF8&iwloc=&output=embed",
      description:
        "Goa's iconic public ferry network crosses the Mandovi and Zuari rivers. The Panaji–Betim crossing is a beloved commuter route — free of charge and offering scenic river views. Taking the ferry at golden hour is an experience in itself, with views of the Old Goa skyline across the water.",
    },
  ],

  climate: [
    {
      period: "October to February",
      summary: "Best Time to Visit",
      description:
        "The peak tourist season. Skies are clear and blue, temperatures hover between 20°C and 32°C, and the sea is calm and perfect for swimming. Beach shacks are in full swing, festivals like Christmas and Carnival bring a festive energy, and accommodation is available across all budgets — though booking ahead is strongly recommended.",
    },
    {
      period: "March to May",
      summary: "Pre-Monsoon Heat",
      description:
        "Temperatures rise sharply, reaching 38°C by May with high humidity. The beaches are noticeably less crowded and rates drop significantly. This is a good time for visitors who prefer peaceful shores and don't mind the heat. The Shigmo Festival in March brings vibrant colour and traditional processions to the streets.",
    },
    {
      period: "June to September",
      summary: "Monsoon Season",
      description:
        "Heavy rainfall transforms Goa into a lush, jungle-green landscape. Most beach shacks and water sports operators close for the season. However, Dudhsagar Falls is at its most dramatic, jungle treks come alive, and the off-season vibe draws long-term travellers and yoga retreats. Accommodation is cheapest during this window.",
    },
  ],

  highlights: [
    {
      id: "fontainhas-1",
      title: "Fontainhas Walk",
      desc: "Stroll through Goa's Latin quarter with pastel homes, heritage lanes, and old-world charm.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-bom-jesus_x2ywr2.jpg",
    },
    {
      id: "spice-plantation-1",
      title: "Spice Plantation Tour",
      desc: "Discover the aromas and stories behind Goa's spice farms with a relaxed local lunch.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-anjuna_f4fecx.jpg",
    },
    {
      id: "divar-island-1",
      title: "Divar Island Escape",
      desc: "Slow down with ferry rides, quiet village roads, and river views away from the beach crowds.",
      img: "https://res.cloudinary.com/dur23cis9/image/upload/v1760680038/dest-chapora_rnpimr.jpg",
    },
  ],
  testimonials: [
    {
      name: "Aarav Mehta",
      title: "Mumbai, India",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-1_yhldzc.jpg",
      text: "Real Goa Holidays made our anniversary trip unforgettable! From private beach dinners to a perfectly planned waterfall trek, every moment felt curated just for us. The team checked in regularly and made sure we experienced the true charm of Goa beyond the usual tourist spots.",
    },
    {
      name: "Sophie & Daniel Wright",
      title: "London, UK",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-2_zgqjpd.jpg",
      text: "We had the most amazing 5 days exploring Goa with Real Goa Holidays! The local guide took us to hidden churches, spice farms, and the best seafood shacks. Everything from transfers to accommodations was seamless. Truly a world-class experience with a local touch.",
    },
    {
      name: "Priya Sharma",
      title: "Bengaluru, India",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-3_rv5oxf.jpg",
      text: "Booked a last-minute weekend getaway through Real Goa Holidays and it was flawless! They arranged everything in hours, from a cozy boutique resort in Anjuna to scooter rentals and sunset cruises. Highly recommend their service if you want a stress-free Goan escape.",
    },
    {
      name: "Lucas Fernandez",
      title: "Lisbon, Portugal",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-4_xd9x3q.jpg",
      text: "Goa was always on my bucket list, and Real Goa Holidays brought it to life. The cultural tour of Old Goa, the beach vibes, and the food trail were simply incredible. Their team goes beyond expectations, you truly feel like you are traveling with friends who know every hidden gem.",
    },
  ],
  gallery: [
    { src: "/images/dest-baga.jpg", alt: "Baga Beach, Goa" },
    { src: "/images/dest-chapora.jpg", alt: "Chapora Fort, Goa" },
    { src: "/images/dest-dudhsagar.jpg", alt: "Dudhsagar Falls, Goa" },
    { src: "/images/dest-bom-jesus.jpg", alt: "Basilica of Bom Jesus, Goa" },
    { src: "/images/dest-anjuna.jpg", alt: "Anjuna Beach, Goa" },
    { src: "/images/dest-nightlife.jpg", alt: "Goa Nightlife" },
    { src: "/images/gallery-7.jpg", alt: "Goa scenery" },
    { src: "/images/gallery-8.jpg", alt: "Goa scenery" },
    { src: "/images/gallery-9.jpg", alt: "Goa scenery" },
  ],
  thankYouHeading: "Goa is waiting for you.",
};
