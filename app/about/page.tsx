import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Users, Heart } from "lucide-react";

import { getPublishedPageBySlug } from "@/lib/cms";
import { hasPhoto } from "@/lib/utils";
import { pageTitle } from "@/lib/site";
import { BlockRenderer } from "@/components/block-renderer";
import Reveal from "@/components/reveal";
import { ClientCarousel } from "@/components/ui/client-carousel";

// NOTE: no CMS "about" page is published yet, so this page renders the content
// below. If one is published, its blocks take over (see AboutPage). This content
// is unchanged from the previous version of the page.
const founder = {
  name: "Jaya Devan",
  role: "Founder & Head Guide, Real Goa Holidays",
  // No founder photograph has been supplied yet: this placeholder is treated
  // as "no photo" and replaced by a deliberate typographic panel until a real
  // image URL is set here (or this section moves into the CMS).
  image: "/placeholder.svg",
  bio: [
    "Born and raised in Panaji, Jaya has spent over 15 years introducing travellers to the Goa that locals love — the quiet fishing villages, the centuries-old chapels tucked between cashew groves, and the shacks where the catch of the day is still cooked over wood fire.",
    "After years of guiding for larger operators, she founded Real Goa Holidays with one simple belief: the best travel experiences are built on genuine connections, not itineraries. Every trip is planned with the same care she would put into showing a close friend around her home.",
    "When she's not on the road, you'll find her at the Sunday market in Mapusa or sailing off Cabo de Rama — living the Goa she loves to share.",
  ],
};

const brand = {
  heading: "About Real Goa Holidays",
  intro:
    "We're local experts dedicated to authentic, premium experiences across Goa. From serene beaches and historic forts to hidden waterfalls and culinary trails, our mission is to craft moments that feel both effortless and unforgettable.",
  benefits: [
    {
      icon: Compass,
      title: "Experienced Guides",
      text: "Our guides are local, certified, and passionate about Goa's culture, nature, and history.",
    },
    {
      icon: Users,
      title: "Custom Packages",
      text: "Tailor-made itineraries for families, couples, groups, and solo travelers—at your pace.",
    },
    {
      icon: Heart,
      title: "Authentic Experiences",
      text: "Support local communities while discovering the real Goa—beyond the tourist trail.",
    },
  ],
};

const testimonials = [
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
];

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPublishedPageBySlug("about").catch(() => null);
  return {
    title: cmsPage?.seoTitle || pageTitle("About Us"),
    description: cmsPage?.seoDescription || brand.intro,
  };
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^\p{L}/u.test(word))
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function AboutPage() {
  const cmsPage = await getPublishedPageBySlug("about").catch(() => null);
  if (cmsPage && cmsPage.blocks.length > 0) {
    return (
      <>
        {cmsPage.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </>
    );
  }

  const founderPhoto = hasPhoto(founder.image);

  return (
    <>
      <h1 className="sr-only">{brand.heading}</h1>

      {/* Founder */}
      <section className="pb-[clamp(4.5rem,9vw,9rem)] pt-32 md:pt-44">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-0">
          {/* Portrait bleeds to the left edge */}
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-h-[72svh] w-full overflow-hidden bg-navy lg:max-h-none lg:rounded-r-[2.5rem]">
              {founderPhoto ? (
                <Image
                  src={founder.image}
                  alt={`${founder.name} — ${founder.role}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              ) : (
                // No photograph supplied yet: initials from the founder's name, set large.
                <div aria-hidden className="absolute inset-0 flex items-end p-[var(--gutter)]">
                  <span className="select-none text-[clamp(7rem,20vw,15rem)] font-semibold leading-[0.8] tracking-tighter text-navy-foreground/15">
                    {initialsOf(founder.name)}
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="gutter lg:col-span-6 lg:col-start-7 lg:pl-4 xl:pl-10"
          >
            <p className="eyebrow text-primary">Meet the founder</p>
            <h2 className="text-headline mt-4 text-balance text-foreground">{founder.name}</h2>
            <p className="mt-4 text-lg font-medium text-primary">{founder.role}</p>
            <div aria-hidden className="my-8 h-px w-16 bg-foreground/25" />
            <div className="measure space-y-5 text-lg leading-[1.7] text-muted-foreground">
              {founder.bio.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "text-xl leading-[1.6] text-foreground/85" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The brand, and what it stands for */}
      <section className="gutter section-y bg-muted/50">
        <div className="wide grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="text-headline text-balance text-foreground">{brand.heading}</h2>
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
              {brand.intro}
            </p>
          </Reveal>

          <ul className="lg:col-span-6 lg:col-start-7">
            {brand.benefits.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="border-t border-border last:border-b">
                <Reveal delay={i * 0.06}>
                  <div className="group flex gap-6 py-8 md:gap-8 md:py-10">
                    <span className="w-7 shrink-0 pt-1.5 text-sm tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="transition-transform duration-500 ease-out group-hover:translate-x-1">
                      <div className="flex items-center gap-3">
                        <Icon className="size-5 shrink-0 text-accent" strokeWidth={1.6} aria-hidden />
                        <h3 className="text-title text-foreground">{title}</h3>
                      </div>
                      <p className="measure mt-3 text-muted-foreground md:text-lg">{text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="about-clients-heading" className="gutter section-y bg-secondary/50">
        <div className="wide">
          <Reveal className="max-w-3xl">
            <h2
              id="about-clients-heading"
              className="text-headline text-balance text-foreground"
            >
              Memories That Stay with You
            </h2>
            <p className="measure mt-5 text-lg text-muted-foreground">
              Memories made, moments cherished — here&apos;s what travellers say about Real Goa
              Holidays.
            </p>
          </Reveal>
          <div className="mt-12 md:mt-16">
            <ClientCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>
    </>
  );
}
