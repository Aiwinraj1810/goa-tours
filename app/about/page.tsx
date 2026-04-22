import CommonContainer from "@/components/CommonConatiner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Users, Heart } from "lucide-react";
import { ClientCarousel } from "@/components/ui/client-carousel";
import Image from "next/image";

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

export default function AboutPage() {
  return (
    <>
      <CommonContainer>
        {/* Owner section */}
        <div className="mx-auto max-w-6xl px-4 py-16 border-t">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-[4/5] w-full max-w-sm mx-auto md:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Jaya Devan — Founder of Real Goa Holidays"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                Meet the founder
              </p>
              <h2 className="text-3xl font-bold mb-1">Jaya Devan</h2>
              <p className="text-primary font-medium mb-6">
                Founder & Head Guide, Real Goa Holidays
              </p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Born and raised in Panaji, Jaya has spent over 15 years
                  introducing travellers to the Goa that locals love — the quiet
                  fishing villages, the centuries-old chapels tucked between
                  cashew groves, and the shacks where the catch of the day is
                  still cooked over wood fire.
                </p>
                <p>
                  After years of guiding for larger operators, she founded Real
                  Goa Holidays with one simple belief: the best travel
                  experiences are built on genuine connections, not itineraries.
                  Every trip is planned with the same care she would put into
                  showing a close friend around her home.
                </p>
                <p>
                  When she's not on the road, you'll find her at the Sunday
                  market in Mapusa or sailing off Cabo de Rama — living the Goa
                  she loves to share.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-3xl font-semibold text-balance mb-4">
            About Real Goa Holidays
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            We're local experts dedicated to authentic, premium experiences
            across Goa. From serene beaches and historic forts to hidden
            waterfalls and culinary trails, our mission is to craft moments that
            feel both effortless and unforgettable.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="bg-card shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Compass className="h-5 w-5 text-accent" />
                  <CardTitle>Experienced Guides</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Our guides are local, certified, and passionate about Goa's
                culture, nature, and history.
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  <CardTitle>Custom Packages</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Tailor-made itineraries for families, couples, groups, and solo
                travelers—at your pace.
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-accent" />
                  <CardTitle>Authentic Experiences</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Support local communities while discovering the real Goa—beyond
                the tourist trail.
              </CardContent>
            </Card>
          </div>
        </div>
      </CommonContainer>

      {/* Testimonials carousel */}
      <section
        aria-labelledby="about-clients-heading"
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-0 lg:px-4">
          <div className="text-center mb-12">
            <h2
              id="about-clients-heading"
              className="text-3xl font-bold text-gray-800 mb-4 text-pretty"
            >
              Memories That Stay with You
            </h2>
            <p className="text-gray-600 px-5 lg:px-0">
              Memories made, moments cherished — here&apos;s what travellers say
              about Real Goa Holidays.
            </p>
          </div>
          <ClientCarousel testimonials={testimonials} />
        </div>
      </section>
    </>
  );
}
