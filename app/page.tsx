import Hero from "@/components/hero"
import FeaturedDestinations from "@/components/featured-destinations"
import Highlights from "@/components/testimonials"
import FloatingBookNow from "@/components/floating-book-now"
import TourPackages from "@/components/tour-packages"

export default function HomePage() {
  return (
    <>
      <Hero />
      <TourPackages />
      <hr />
      <FeaturedDestinations />
      <Highlights />
      <FloatingBookNow />
    </>
  )
}
