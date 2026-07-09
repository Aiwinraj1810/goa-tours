import { notFound } from "next/navigation";
import { getDestination, isValidDestination } from "@/lib/destinations";
import CommonContainer from "@/components/CommonConatiner";
import GalleryGrid from "@/components/gallery-grid";

export default async function DestinationGalleryPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = await params;
  if (!isValidDestination(destination)) notFound();

  const dest = getDestination(destination)!;

  return (
    <CommonContainer>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold mb-6 text-balance">Gallery</h1>
        <p className="text-muted-foreground mb-8">
          Glimpses of {dest.label} — beaches, forts, waterfalls, and vibrant culture.
        </p>
        <GalleryGrid images={dest.content.gallery} />
      </div>
    </CommonContainer>
  );
}
