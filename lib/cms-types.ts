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

export type TourPackageItem = {
  image: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  badge: string;
};

export type TourPackagesBlock = {
  id: string;
  type: "tourPackages";
  heading: string;
  moreHref: string;
  packages: TourPackageItem[];
};

export type DestinationTile = {
  image: string;
  name: string;
  href: string;
};

export type DestinationHighlightBlock = {
  id: string;
  type: "destinationHighlight";
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerTags: string[];
  bannerCtaLabel: string;
  bannerCtaHref: string;
  moreHref: string;
  tiles: DestinationTile[];
};

export type FeatureItem = {
  icon: string;
  label: string;
};

export type FeaturesBlock = {
  id: string;
  type: "features";
  heading: string;
  subheading: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  features: FeatureItem[];
};

export type EnquireBannerBlock = {
  id: string;
  type: "enquireBanner";
  image: string;
  heading: string;
  body: string;
  ratingText: string;
  ctaLabel: string;
  ctaHref: string;
  phone: string;
};

export type CollectionItem = {
  image: string;
  name: string;
  rating: string;
  startingPrice: string;
  href: string;
};

export type CollectionsBlock = {
  id: string;
  type: "collections";
  heading: string;
  items: CollectionItem[];
};

export type OfferItem = {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  validity: string;
};

export type OffersBlock = {
  id: string;
  type: "offers";
  heading: string;
  offers: OfferItem[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqBlock = {
  id: string;
  type: "faq";
  heading: string;
  subheading: string;
  items: FaqItem[];
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
  | RichTextBlock
  | TourPackagesBlock
  | DestinationHighlightBlock
  | FeaturesBlock
  | EnquireBannerBlock
  | CollectionsBlock
  | OffersBlock
  | FaqBlock;

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

export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  children: NavItem[];
};

export type FooterLinkColumn = {
  heading: string;
  links: NavItem[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export type CmsSiteSettings = {
  siteName: string;
  logo?: string;
  navGroups: NavGroup[];
  buyPackagesLabel: string;
  buyPackagesHref: string;
  footerText: string;
  footerColumns: FooterLinkColumn[];
  newsletterHeading: string;
  newsletterSubheading: string;
  address: string;
  phones: string[];
  email: string;
  socialLinks: SocialLink[];
  footerMapEmbedUrl: string;
};
