import "server-only";

import { getDb } from "@/lib/db";
import type { CmsPackage, CmsPage, CmsSiteSettings } from "@/lib/cms-types";

const COLLECTIONS = {
  pages: "pages",
  packages: "packages",
  siteSettings: "siteSettings",
} as const;

const SITE_SETTINGS_ID = "site-settings";

export async function getPublishedPageBySlug(
  slug: string,
  destination?: string,
): Promise<CmsPage | null> {
  const db = await getDb();
  const filter: Record<string, string> = { slug, status: "published" };
  if (destination) filter.destination = destination;
  const doc = await db
    .collection(COLLECTIONS.pages)
    .findOne(filter);

  if (!doc) return null;

  return {
    ...doc,
    _id: doc._id.toString(),
  } as CmsPage;
}

export async function getPublishedPackagesByDestination(destination: string): Promise<CmsPackage[]> {
  const db = await getDb();
  const docs = await db
    .collection(COLLECTIONS.packages)
    .find({ destination, status: "published" }, { sort: { publishedAt: 1 } })
    .toArray();

  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  })) as CmsPackage[];
}

export async function getSiteSettings(): Promise<CmsSiteSettings | null> {
  const db = await getDb();
  const doc = await db
    .collection<CmsSiteSettings & { _id: string; updatedAt: string }>(COLLECTIONS.siteSettings)
    .findOne({ _id: SITE_SETTINGS_ID });

  if (!doc) return null;

  const { _id, updatedAt, ...settings } = doc;
  return settings as CmsSiteSettings;
}

export async function getPublishedPackageBySlug(
  destination: string,
  slug: string,
): Promise<CmsPackage | null> {
  const db = await getDb();
  const doc = await db
    .collection(COLLECTIONS.packages)
    .findOne({ destination, slug, status: "published" });

  if (!doc) return null;

  return {
    ...doc,
    _id: doc._id.toString(),
  } as CmsPackage;
}
