import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageTitle } from "@/lib/site";
import { getDestination, isValidDestination } from "@/lib/destinations";
import { getPublishedPageBySlug } from "@/lib/cms";
import { BlockRenderer } from "@/components/block-renderer";
import FloatingBookNow from "@/components/floating-book-now";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string; slug: string }>;
}): Promise<Metadata> {
  const { destination, slug } = await params;
  if (!isValidDestination(destination)) return {};
  const page = await getPublishedPageBySlug(slug, destination).catch(() => null);
  if (!page) return {};
  return {
    title: page.seoTitle || pageTitle(page.title),
    description: page.seoDescription || undefined,
  };
}

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

  const opensWithHero = cmsPage.blocks[0]?.type === "hero";
  return (
    <>
      <div className={opensWithHero ? undefined : "pt-28 md:pt-40"}>
        {cmsPage.blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            destination={destination}
            destinationLabel={dest.label}
          />
        ))}
      </div>
      <FloatingBookNow destination={destination} />
    </>
  );
}
