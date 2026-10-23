import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidDestination } from "@/lib/destinations";
import { pageTitle } from "@/lib/site";
import { getPublishedPageBySlug } from "@/lib/cms";
import { BlockRenderer } from "@/components/block-renderer";
import DestinationHome from "@/components/destination-home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string }>;
}): Promise<Metadata> {
  const { destination } = await params;
  // Destination metadata comes from the destination layout. "/" serves the same
  // page as "/goa", so "/" is the canonical address.
  if (isValidDestination(destination)) {
    return destination === "goa" ? { alternates: { canonical: "/" } } : {};
  }
  const page = await getPublishedPageBySlug(destination).catch(() => null);
  if (!page) return {};
  return {
    title: page.seoTitle || pageTitle(page.title),
    description: page.seoDescription || undefined,
  };
}

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
    const opensWithHero = globalPage.blocks[0]?.type === "hero";
    return (
      <div className={opensWithHero ? undefined : "pt-28 md:pt-40"}>
        {globalPage.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    );
  }

  return <DestinationHome destination={destination} />;
}
