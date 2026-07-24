import type { DestinationContent } from "@/lib/destinations/types";

export const keralaContent: DestinationContent = {
  hero: {
    heading: "Discover God's Own Country",
    subheading: "Backwaters, Hills & Beaches — Curated by Locals",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  },

  activities: [
    {
      title: "Houseboat Cruise",
      description:
        "Drift through the tranquil backwaters of Alleppey on a traditional kettuvallam houseboat, with home-cooked Kerala meals and a silence broken only by birdsong.",
      image: "/placeholder.svg",
    },
    {
      title: "Munnar Tea Walk",
      description:
        "Walk through rolling carpets of tea at 1,600 metres with a local guide explaining the journey from plucking leaf to brewed cup at a working tea factory.",
      image: "/placeholder.svg",
    },
    {
      title: "Fort Kochi Heritage Walk",
      description:
        "Wander through Fort Kochi's colonial-era lanes: Chinese fishing nets at dawn, the Mattancherry spice market, the Jewish Synagogue, and Portuguese-Dutch architecture.",
      image: "/placeholder.svg",
    },
    {
      title: "Kathakali Performance",
      description:
        "Watch Kerala's ancient classical dance form performed live — elaborate facial makeup, symbolic costumes, and stories from the Mahabharata brought to vivid life.",
      image: "/placeholder.svg",
    },
    {
      title: "Periyar Wildlife Safari",
      description:
        "Explore the Periyar Tiger Reserve in Thekkady on a guided boat safari or forest trek, with sightings of elephants, gaur, sambar deer, and rich birdlife.",
      image: "/placeholder.svg",
    },
    {
      title: "Ayurveda Retreat",
      description:
        "Experience authentic Kerala Ayurveda with traditional massages, herbal steam baths, and therapeutic treatments prescribed by qualified Ayurvedic physicians.",
      image: "/placeholder.svg",
    },
    {
      title: "Varkala Cliff Walk",
      description:
        "Stroll along the dramatic laterite cliffs of Varkala, with the Arabian Sea below, beach cafes perched at the edge, and stunning panoramic views at sunset.",
      image: "/placeholder.svg",
    },
  ],

  districts: [
    {
      name: "Alappuzha",
      places: [
        {
          name: "Alleppey Backwaters",
          description: "India's famous network of lagoons, canals, and lakes — best explored by houseboat.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Marari Beach",
          description: "A peaceful fishing village beach fringed by coconut groves, far from tourist crowds.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Ambalappuzha Temple",
          description: "A 17th-century Krishna temple famous for its palpayasam — sweet rice porridge offered as prasad.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Kumarakom Bird Sanctuary",
          description: "A birder's paradise on the banks of Vembanad Lake, home to migratory birds from Siberia.",
          images: ["/placeholder.svg"],
        },
      ],
    },
    {
      name: "Munnar",
      places: [
        {
          name: "Tea Estates",
          description: "Endless carpets of green stretching up misty hillsides — the heart of Kerala's tea country.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Eravikulam National Park",
          description: "Home to the endangered Nilgiri Tahr and some of the highest peaks in the Western Ghats.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Mattupetty Dam",
          description: "A high-altitude reservoir surrounded by forest and tea estates, with a scenic boating lake.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Top Station",
          description: "The highest point in Munnar at 1,868 metres, offering breathtaking views of Tamil Nadu.",
          images: ["/placeholder.svg"],
        },
      ],
    },
    {
      name: "Fort Kochi",
      places: [
        {
          name: "Chinese Fishing Nets",
          description: "Enormous cantilevered fishing nets installed by Chinese traders in the 14th century.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Mattancherry Palace",
          description: "A 16th-century Dutch palace famed for its Kerala-style murals depicting scenes from the Ramayana.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Jewish Synagogue",
          description: "India's oldest active synagogue, built in 1568, with hand-painted Chinese floor tiles.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Marine Drive",
          description: "A scenic promenade along the Kochi harbour, perfect for an evening walk.",
          images: ["/placeholder.svg"],
        },
      ],
    },
    {
      name: "Thekkady",
      places: [
        {
          name: "Periyar Wildlife Sanctuary",
          description: "One of the best-managed tiger reserves in India, spread across 925 sq km of forest.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Spice Plantations",
          description: "Tour the pepper, cardamom, and coffee estates of the Cardamom Hills with guided walks.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Bamboo Rafting",
          description: "A unique way to explore the Periyar forest — bamboo raft guided by tribal naturalists.",
          images: ["/placeholder.svg"],
        },
        {
          name: "Elephant Junction",
          description: "An ethical elephant camp offering gentle interactions and insights into elephant care.",
          images: ["/placeholder.svg"],
        },
      ],
    },
  ],

  climate: [
    {
      period: "October to February",
      summary: "Best Time to Visit",
      description:
        "The ideal window to experience Kerala. The post-monsoon landscape is lush and clean, temperatures are pleasant between 20°C and 33°C, and sea conditions are perfect for beaches and backwater cruises. Onam and other festivals add cultural depth to the travel experience.",
    },
    {
      period: "March to May",
      summary: "Warm & Pre-Monsoon",
      description:
        "Temperatures rise to 35°C with increasing humidity. Beach destinations like Varkala and Kovalam are still enjoyable in the mornings and evenings. Munnar and Thekkady remain comfortable at altitude. Vishu (Kerala New Year in April) is a beautiful time to witness local celebrations.",
    },
    {
      period: "June to September",
      summary: "Southwest Monsoon",
      description:
        "Kerala receives the country's first and heaviest monsoon rains. The Western Ghats and backwaters are at their most atmospheric — deep green, misty, and dramatic. Ayurveda treatments are considered most effective during the monsoon. Prices drop and crowds thin significantly.",
    },
  ],

  highlights: [
    {
      id: "alleppey-1",
      title: "Alleppey Backwaters",
      desc: "Glide through a labyrinth of lagoons and canals on a traditional kettuvallam houseboat.",
      img: "/placeholder.svg",
    },
    {
      id: "munnar-1",
      title: "Munnar Tea Gardens",
      desc: "Walk through endless carpets of tea at 1,600 metres with crisp mountain air and misty views.",
      img: "/placeholder.svg",
    },
    {
      id: "fort-kochi-1",
      title: "Fort Kochi Heritage",
      desc: "Wander through colonial-era lanes, Chinese fishing nets, and vibrant spice markets.",
      img: "/placeholder.svg",
    },
  ],
  testimonials: [
    {
      name: "Rohan & Meera Nair",
      title: "Delhi, India",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-1_yhldzc.jpg",
      text: "Our houseboat experience in Alleppey was absolutely magical. Real Goa Holidays handled every detail perfectly — from the freshly cooked Kerala meals on board to the quiet backwater routes only locals know. We will be back for the hill stations next time.",
    },
    {
      name: "Emma & James Taylor",
      title: "Edinburgh, UK",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-2_zgqjpd.jpg",
      text: "Kerala exceeded every expectation. The Munnar tea gardens, the wildlife safari in Thekkady, and that final evening on Kovalam beach — all perfectly paced. The team at Real Goa Holidays genuinely care about making the trip special.",
    },
    {
      name: "Ananya Krishnan",
      title: "Chennai, India",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-3_rv5oxf.jpg",
      text: "I have been to Kerala before but never like this. Seeing the backwaters from a houseboat, visiting a working tea factory, and that Ayurveda session in Kovalam — it felt like the real Kerala, not the tourist version. Highly recommend.",
    },
    {
      name: "Marco Rossi",
      title: "Milan, Italy",
      avatar:
        "https://res.cloudinary.com/dur23cis9/image/upload/v1760783456/traveler-4_xd9x3q.jpg",
      text: "From the moment I landed in Cochin to the final transfer at Trivandrum, everything was seamless. The Fort Kochi heritage walk on day one set the perfect tone. Kerala is truly God's Own Country and Real Goa Holidays showed me exactly why.",
    },
  ],
  gallery: [
    { src: "/placeholder.svg", alt: "Alleppey Backwaters, Kerala" },
    { src: "/placeholder.svg", alt: "Munnar Tea Gardens, Kerala" },
    { src: "/placeholder.svg", alt: "Fort Kochi, Kerala" },
    { src: "/placeholder.svg", alt: "Thekkady Wildlife, Kerala" },
    { src: "/placeholder.svg", alt: "Kovalam Beach, Kerala" },
    { src: "/placeholder.svg", alt: "Kerala Houseboat" },
    { src: "/placeholder.svg", alt: "Varkala Cliffs, Kerala" },
    { src: "/placeholder.svg", alt: "Kerala Spices" },
    { src: "/placeholder.svg", alt: "Kerala Elephants" },
  ],
  thankYouHeading: "Kerala is waiting for you.",
};
