import GalleryGrid from "@/components/gallery-grid"

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6 text-balance">Gallery</h1>
      <p className="text-muted-foreground mb-8">
        Glimpses of Goa—beaches, forts, waterfalls, churches, and vibrant nights.
      </p>
      <GalleryGrid />
    </div>
  )
}
