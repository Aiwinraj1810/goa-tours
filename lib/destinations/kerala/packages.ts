import type { Package } from "@/lib/destinations/types";

export const keralaPackages: Package[] = [
  {
    slug: "backwaters-houseboat-escape",
    title: "3 Days, 2 Nights — Backwaters Houseboat Escape",
    img: "/placeholder.svg",
    desc: "Drift through the tranquil backwaters of Alleppey on a private houseboat. Pure Kerala at its finest.",
    longDesc:
      "Kerala's backwaters are unlike anywhere else on earth — a labyrinth of lagoons, canals, and lakes lined with coconut palms and quiet villages. This 3-day escape puts you at the heart of it aboard a traditional kettuvallam houseboat. Wake up to mist rising off the water, watch village life drift past from your deck, and fall asleep to the sound of paddles and crickets. Every meal, every transfer, every moment is handled so you can simply be present.",
    details: "Includes houseboat stay, all meals & village transfers.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Alleppey Check-in",
        description:
          "Pickup from Cochin airport, drive to Alleppey, and board your private houseboat in the afternoon. Sunset cruise along the main canal with a welcome dinner on deck.",
      },
      {
        day: "Day 2",
        title: "Full Day on the Backwaters",
        description:
          "Spend the entire day gliding through the backwaters — visit a coir-weaving village, watch toddy-tappers at work, and swim at a quiet lagoon. Freshly cooked Kerala meals served on board.",
        image: "/placeholder.svg",
      },
      {
        day: "Day 3",
        title: "Village Walk & Departure",
        description:
          "Early morning canoe ride through narrow channels, leisurely breakfast on the houseboat, and transfer back to Cochin airport.",
      },
    ],
  },
  {
    slug: "munnar-hills-retreat",
    title: "4 Days, 3 Nights — Munnar Hills Retreat",
    img: "/placeholder.svg",
    desc: "Breathe in cool mountain air among endless tea gardens, misty waterfalls, and wildlife sanctuaries.",
    longDesc:
      "Perched at 1,600 metres in the Western Ghats, Munnar is Kerala's highland jewel. Rolling carpets of tea, spice-scented air, and a cool climate that feels worlds away from the coast — this 4-day retreat lets you settle into the rhythm of the hills. Trek to viewpoints, visit tea factories, spot Nilgiri tahrs in Eravikulam, and watch the sunset turn the plantations gold. Accommodation in boutique hill bungalows; every detail arranged.",
    details: "Includes plantation stay, guided treks & factory visits.",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Tea Garden Walk",
        description:
          "Scenic drive from Cochin to Munnar through rubber and cardamom estates. Check in and take an evening walk through the tea gardens with a local guide.",
        image: "/placeholder.svg",
      },
      {
        day: "Day 2",
        title: "Waterfalls & Spice Trails",
        description:
          "Morning visit to Attukal Waterfalls followed by a guided spice plantation tour. Afternoon at leisure — optional nature walk to the Kundala Lake viewpoint.",
        image: "/placeholder.svg",
      },
      {
        day: "Day 3",
        title: "Eravikulam & Tea Factory",
        description:
          "Full morning at Eravikulam National Park — home to the endangered Nilgiri tahr. Afternoon visit to a working tea factory to see processing from leaf to cup.",
      },
      {
        day: "Day 4",
        title: "Sunrise & Departure",
        description:
          "Early sunrise hike to the Top Station viewpoint overlooking Tamil Nadu. Breakfast at the bungalow and comfortable drive back to Cochin.",
      },
    ],
  },
  {
    slug: "kerala-complete-experience",
    title: "6 Days, 5 Nights — Kerala Complete Experience",
    img: "/placeholder.svg",
    desc: "From Fort Kochi's colonial lanes to Thekkady's wildlife, backwaters, and Kovalam's beaches — all of Kerala in one journey.",
    longDesc:
      "Kerala has many faces, and this 6-day journey shows you all of them. Begin in the spice-scented lanes of Fort Kochi, move through Thekkady's misty forests and Alleppey's mirror-still backwaters, and end with the Arabian Sea at your feet in Kovalam. It is the kind of trip you plan once and talk about forever — every region different, every day memorable, and every detail taken care of.",
    details: "Includes all accommodation, guided tours & transfers.",
    itinerary: [
      {
        day: "Day 1",
        title: "Fort Kochi Arrival & Heritage Walk",
        description:
          "Arrive at Cochin airport, check in to a heritage boutique hotel in Fort Kochi. Evening walking tour: Chinese fishing nets, Jew Town spice market, and the Dutch Palace.",
        image: "/placeholder.svg",
      },
      {
        day: "Day 2",
        title: "Thekkady Spice Plantation & Wildlife",
        description:
          "Drive to Thekkady, visit a spice and tea plantation, and take an evening boat safari on Periyar Lake to spot elephants and deer at the waterline.",
        image: "/placeholder.svg",
      },
      {
        day: "Day 3",
        title: "Alleppey Houseboat Day",
        description:
          "Drive to Alleppey, board a private houseboat and spend the full day on the backwaters. Freshly cooked Kerala meals on board, overnight stay on the water.",
      },
      {
        day: "Day 4",
        title: "Backwaters to Varkala Cliffs",
        description:
          "Morning on the houseboat, then drive south to Varkala. Check in to a clifftop guesthouse and spend the afternoon at the famous Varkala Beach below the laterite cliffs.",
        image: "/placeholder.svg",
      },
      {
        day: "Day 5",
        title: "Kovalam Beach & Ayurveda",
        description:
          "Drive to Kovalam, one of Kerala's most celebrated beaches. Afternoon traditional Ayurvedic massage session, evening seafood dinner overlooking the lighthouse beach.",
      },
      {
        day: "Day 6",
        title: "Trivandrum & Departure",
        description:
          "Visit Padmanabhaswamy Temple complex (exterior), browse the local market, and comfortable transfer to Trivandrum International Airport.",
      },
    ],
  },
];

export function getKeralaPackageBySlug(slug: string): Package | undefined {
  return keralaPackages.find((p) => p.slug === slug);
}
