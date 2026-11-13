import type { Block } from "@/lib/cms-types";

export type SectionNavItem = { id: string; label: string };

/** DOM id of a homepage block's wrapper, used as the scroll target. */
export const sectionDomId = (block: Block) => `section-${block.id}`;

/**
 * Label for a block in the floating section menu: the block's own CMS heading
 * where it has one, otherwise a short fixed label. Returns null for block
 * types that do not make sense as a jump target.
 */
export function sectionNavLabel(block: Block, destinationLabel: string): string | null {
  const text = (value?: string) => value?.trim() || "";

  switch (block.type) {
    case "hero":
      return "Home";
    case "destinationHighlight":
      return "Top picks";
    case "places":
      return `Explore ${destinationLabel}`;
    case "collections":
      return text(block.heading) || "Activities";
    case "tourPackages":
      return text(block.heading) || "Packages";
    case "educationalTrips":
      return text(block.eyebrow) || text(block.heading) || "School & college trips";
    case "features":
      return "Why choose us";
    case "enquireBanner":
      return "Enquire";
    case "transport":
      return text(block.heading) || "How to reach";
    case "climate":
      return text(block.heading) || "Best time to visit";
    case "offers":
      return text(block.heading) || "Offers";
    case "testimonials":
      return text(block.heading) || "Reviews";
    case "faq":
      return text(block.heading) || "FAQ";
    default:
      return null;
  }
}
