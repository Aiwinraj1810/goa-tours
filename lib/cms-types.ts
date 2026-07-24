import type {
  Activity,
  ClimateEntry,
  District,
  GalleryImage,
  Testimonial,
  TransportEntry,
} from "@/lib/destinations/types";

// Block types mirror the CMS schema exactly so MongoDB documents deserialize
// directly into these shapes without any transformation.

export type HeroBlock = {
  id: string;
  type: "hero";
  heading: string;
  subheading: string;
  images: string[];
};

export type ActivitiesBlock = {
  id: string;
  type: "activities";
  activities: Activity[];
};

export type PlacesBlock = {
  id: string;
  type: "places";
  districts: District[];
};

export type TransportBlock = {
  id: string;
  type: "transport";
  entries: TransportEntry[];
};

export type ClimateBlock = {
  id: string;
  type: "climate";
  entries: ClimateEntry[];
};

export type TestimonialsBlock = {
  id: string;
  type: "testimonials";
  testimonials: Testimonial[];
};

export type GalleryBlock = {
  id: string;
  type: "gallery";
  images: GalleryImage[];
};

export type CtaBlock = {
  id: string;
  type: "cta";
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type RichTextBlock = {
  id: string;
  type: "richText";
  body: string;
};

export type Block =
  | HeroBlock
  | ActivitiesBlock
  | PlacesBlock
  | TransportBlock
  | ClimateBlock
  | TestimonialsBlock
  | GalleryBlock
  | CtaBlock
  | RichTextBlock;

export type CmsPackage = {
  _id: string;
  title: string;
  slug: string;
  destination: string;
  summary: string;
  heroImage?: string;
  longDescription: string;
  details: string[];
  itinerary: { dayTitle: string; description: string }[];
  status: "draft" | "published";
  publishedAt?: string | null;
};

export type CmsPage = {
  _id: string;
  title: string;
  slug: string;
  destination?: string;
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  blocks: Block[];
  publishedAt?: string | null;
};
