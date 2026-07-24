import { notFound } from "next/navigation";
import { getDestination, isValidDestination } from "@/lib/destinations";
import { getPublishedPageBySlug } from "@/lib/cms";
import { BlockRenderer } from "@/components/block-renderer";
import FloatingBookNow from "@/components/floating-book-now";

export default async function DestinationSubPage({
  params,
}: {
  params: Promise<{ destination: string; slug: string }>;
}) {
  const { destination, slug } = await params;
  if (!isValidDestination(destination)) notFound();

  const dest = getDestination(destination)!;

  const cmsPage = await getPublishedPageBySlug(slug, destination).catch(() => null);
  if (!cmsPage || cmsPage.blocks.length === 0) notFound();

  return (
    <>
      {cmsPage.blocks.map((block) => (
        <BlockRenderer
          key={block.id}
          block={block}
          destination={destination}
          destinationLabel={dest.label}
        />
      ))}
      <FloatingBookNow destination={destination} />
    </>
  );
}
