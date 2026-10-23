import type { MetadataRoute } from "next";

import { VALID_DESTINATIONS } from "@/lib/destinations";
import { getPublishedPackagesByDestination, getPublishedPageSlugs } from "@/lib/cms";
import { SITE_URL } from "@/lib/site";

// Built from real data at request time: static routes, each destination's
// pages, published CMS packages and published CMS pages. Nothing is listed
// that the site would not actually serve.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entry = (path: string, priority: number, lastModified?: Date) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified ?? new Date(),
    priority,
  });

  const entries: MetadataRoute.Sitemap = [
    entry("/", 1),
    entry("/about", 0.6),
  ];

  for (const destination of VALID_DESTINATIONS) {
    // "/" is the Goa home page, so the Goa root is not listed twice.
    if (destination !== "goa") entries.push(entry(`/${destination}`, 0.9));
    entries.push(
      entry(`/${destination}/packages`, 0.9),
      entry(`/${destination}/gallery`, 0.6),
      entry(`/${destination}/contact`, 0.5),
    );

    const packages = await getPublishedPackagesByDestination(destination).catch(() => []);
    for (const pkg of packages) {
      entries.push(entry(`/${destination}/packages/${pkg.slug}`, 0.8));
    }
  }

  const pages = await getPublishedPageSlugs().catch(() => []);
  for (const page of pages) {
    // Destination home pages ("goa", "kerala") are already covered above.
    if (!page.destination && (VALID_DESTINATIONS as string[]).includes(page.slug)) continue;
    if (page.slug === "about" || page.slug === page.destination) continue;
    const path = page.destination ? `/${page.destination}/${page.slug}` : `/${page.slug}`;
    entries.push(entry(path, 0.5, page.updatedAt));
  }

  return entries;
}
