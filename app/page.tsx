import type { Metadata } from "next";

import DestinationHome from "@/components/destination-home";
import { getPublishedPageBySlug } from "@/lib/cms";

// "/" is the Goa home page: use the Goa CMS page's SEO fields when it has them,
// otherwise the site defaults from the root layout.
export async function generateMetadata(): Promise<Metadata> {
  const cms = await getPublishedPageBySlug("goa").catch(() => null);
  return {
    ...(cms?.seoTitle ? { title: cms.seoTitle } : {}),
    ...(cms?.seoDescription ? { description: cms.seoDescription } : {}),
    alternates: { canonical: "/" },
  };
}

// The old Goa/Kerala split chooser lives in components/_archive/split-landing.tsx.
// Destination switching now happens via the switcher in the header.
export default function HomePage() {
  return <DestinationHome destination="goa" />;
}
