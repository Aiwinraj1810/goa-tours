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
};

export type ClimateEntry = {
  period: string;
  summary: string;
  description: string;
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
