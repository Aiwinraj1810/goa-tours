import { notFound } from "next/navigation";
import { isValidDestination } from "@/lib/destinations";
import { getPublishedPageBySlug } from "@/lib/cms";
import { BlockRenderer } from "@/components/block-renderer";
import DestinationHome from "@/components/destination-home";

export default async function DestinationHomePage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = await params;

  // Non-destination segments (e.g. /faq, /terms) are treated as global CMS pages.
  if (!isValidDestination(destination)) {
    const globalPage = await getPublishedPageBySlug(destination).catch(() => null);
    if (!globalPage || globalPage.blocks.length === 0) notFound();
    return (
      <>
        {globalPage.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </>
    );
  }

  return <DestinationHome destination={destination} />;
}
