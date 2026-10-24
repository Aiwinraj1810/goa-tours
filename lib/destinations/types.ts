export type ItineraryDay = {
  day: string;
  title: string;
  description: string;
  image?: string;
};

export type Package = {
  slug: string;
  title: string;
  img: string;
  desc: string;
  longDesc: string;
  details: string;
  itinerary: ItineraryDay[];
};

export type ContactInfo = {
  phones: { value: string; href: string }[];
  email: string;
  emailHref: string;
  address: string;
};

export type Highlight = {
  id: string;
  title: string;
  desc: string;
  img: string;
};

export type Testimonial = {
  name: string;
  title: string;
  avatar: string;
  text: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Activity = {
  title: string;
  description: string;
  image: string;
};

export type Place = {
  name: string;
  description?: string;
  images: string[];
  /** Optional grouping label within a district, e.g. "Beaches". */
  category?: string;
};

export type District = {
  name: string;
  places: Place[];
};

export type TransportEntry = {
  name: string;
  location: string;
  mapEmbedUrl: string;
  description: string;
  kind?: "airport" | "railway" | "port" | "bus" | "other";
  code?: string;
  serves?: string[];
};

export type ClimateEntry = {
  period: string;
  summary: string;
  description: string;
  /** Months 1–12, .5 = mid-month. start > end wraps over the new year. */
  startMonth?: number;
  endMonth?: number;
  season?: "best" | "hot" | "monsoon" | "other";
};

export type DestinationContent = {
  hero: {
    heading: string;
    subheading: string;
    images?: string[];
  };
  activities: Activity[];
  districts: District[];
  transport?: TransportEntry[];
  climate: ClimateEntry[];
  highlights: Highlight[];
  testimonials: Testimonial[];
  gallery: GalleryImage[];
  thankYouHeading: string;
};

export type Destination = {
  slug: "goa" | "kerala";
  label: string;
  tagline: string;
  coverImage: string;
  packages: Package[];
  contact: ContactInfo;
  content: DestinationContent;
};

export type DestinationSlug = "goa" | "kerala";
