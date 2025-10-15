import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, Users, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-balance mb-4">About Goa Tours</h1>
      <p className="text-muted-foreground max-w-3xl">
        We’re local experts dedicated to authentic, premium experiences across Goa. From serene beaches and historic
        forts to hidden waterfalls and culinary trails, our mission is to craft moments that feel both effortless and
        unforgettable.
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
            Our guides are local, certified, and passionate about Goa’s culture, nature, and history.
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
            Tailor-made itineraries for families, couples, groups, and solo travelers—at your pace.
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
            Support local communities while discovering the real Goa—beyond the tourist trail.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
