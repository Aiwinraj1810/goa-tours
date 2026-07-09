import type { Destination, DestinationSlug } from "./types";
import { goaPackages, getGoaPackageBySlug } from "./goa/packages";
import { goaContact } from "./goa/constants";
import { goaContent } from "./goa/content";
import { keralaPackages, getKeralaPackageBySlug } from "./kerala/packages";
import { keralaContact } from "./kerala/constants";
import { keralaContent } from "./kerala/content";

export const destinations: Record<DestinationSlug, Destination> = {
  goa: {
    slug: "goa",
    label: "Goa",
    tagline: "Sun, Sand & Serenity",
    coverImage:
      "https://res.cloudinary.com/dur23cis9/image/upload/v1760686895/pexels-belle-co-99483-1000445_11zon_1_2_aiyarm.webp",
    packages: goaPackages,
    contact: goaContact,
    content: goaContent,
  },
  kerala: {
    slug: "kerala",
    label: "Kerala",
    tagline: "God's Own Country",
    coverImage: "/placeholder.svg",
    packages: keralaPackages,
    contact: keralaContact,
    content: keralaContent,
  },
};

export function getDestination(slug: string): Destination | undefined {
  return destinations[slug as DestinationSlug];
}

export function getPackageBySlug(destinationSlug: string, packageSlug: string) {
  if (destinationSlug === "goa") return getGoaPackageBySlug(packageSlug);
  if (destinationSlug === "kerala") return getKeralaPackageBySlug(packageSlug);
  return undefined;
}

export const VALID_DESTINATIONS: DestinationSlug[] = ["goa", "kerala"];

export function isValidDestination(slug: string): slug is DestinationSlug {
  return VALID_DESTINATIONS.includes(slug as DestinationSlug);
}

export type { Destination, DestinationSlug, Package } from "./types";
