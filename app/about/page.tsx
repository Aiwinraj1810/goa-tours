import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublishedPageBySlug } from "@/lib/cms";
import { pageTitle } from "@/lib/site";
import { BlockRenderer } from "@/components/block-renderer";

// The About page is entirely CMS content: publish a page with the slug "about"
// and arrange its blocks (founder profile, educational/“list” section,
// testimonials, …) in the admin.
export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getPublishedPageBySlug("about").catch(() => null);
  return {
    title: cmsPage?.seoTitle || pageTitle(cmsPage?.title || "About Us"),
    description: cmsPage?.seoDescription || undefined,
  };
}

export default async function AboutPage() {
  const cmsPage = await getPublishedPageBySlug("about").catch(() => null);
  if (!cmsPage || cmsPage.blocks.length === 0) notFound();

  const opensWithHero = cmsPage.blocks[0]?.type === "hero";
  return (
    <div className={opensWithHero ? undefined : "pt-28 md:pt-40"}>
      <h1 className="sr-only">{cmsPage.title}</h1>
      {cmsPage.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}
