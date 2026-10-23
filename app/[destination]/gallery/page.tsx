import { notFound } from "next/navigation";
import { getDestination, isValidDestination } from "@/lib/destinations";
import GalleryGrid from "@/components/gallery-grid";
import { hasPhoto } from "@/lib/utils";

export default async function DestinationGalleryPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = await params;
  if (!isValidDestination(destination)) notFound();

  const dest = getDestination(destination)!;
  const count = dest.content.gallery.filter((img) => hasPhoto(img.src)).length;

  return (
    <>
      {/* Introduction: compact, so the photographs come first */}
      <section className="gutter pb-10 pt-32 md:pb-14 md:pt-44">
        <div className="wide grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-primary">Gallery</p>
            <h1 className="text-headline mt-4 max-w-4xl text-balance text-foreground">
              Glimpses of {dest.label}
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="measure text-muted-foreground md:text-lg">
              Beaches, forts, waterfalls, and vibrant culture.
            </p>
            {count > 0 ? (
              <p className="mt-4 text-sm tabular-nums text-muted-foreground">
                {String(count).padStart(2, "0")} {count === 1 ? "photograph" : "photographs"}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Photography uses the full width, on the shared responsive gutters */}
      <section className="gutter pb-[clamp(4rem,9vw,8rem)]">
        <div className="wide">
          <GalleryGrid images={dest.content.gallery} />
        </div>
      </section>
    </>
  );
}
