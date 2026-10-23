import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, Download } from "lucide-react";

import { getDestination, getPackageBySlug, isValidDestination } from "@/lib/destinations";
import { getPublishedPackageBySlug } from "@/lib/cms";
import { hasPhoto } from "@/lib/utils";
import { pageTitle } from "@/lib/site";
import CtaBanner from "@/components/cta-banner";
import EnquiryForm from "@/components/enquiry-form";
import ItineraryTimeline from "@/components/itinerary-timeline";
import Reveal from "@/components/reveal";
import type { DestinationSlug } from "@/lib/destinations/types";
import type { ItineraryDay } from "@/lib/packages";

// One shape for the page, whichever source the package comes from (CMS first,
// then the code-based content). Optional fields stay empty and are not rendered.
type DetailPackage = {
  title: string;
  summary: string;
  image: string;
  details: string[];
  longDescription: string;
  itinerary: ItineraryDay[];
};

// cache() so the page and its metadata share one lookup per request
const loadPackage = cache(async function loadPackage(
  destination: string,
  slug: string,
): Promise<DetailPackage | null> {
  const cmsPkg = await getPublishedPackageBySlug(destination, slug).catch(() => null);
  if (cmsPkg) {
    return {
      title: cmsPkg.title,
      summary: cmsPkg.summary ?? "",
      image: cmsPkg.heroImage ?? "",
      details: (cmsPkg.details ?? []).filter(Boolean),
      longDescription: cmsPkg.longDescription ?? "",
      itinerary: (cmsPkg.itinerary ?? []).map((item, i) => ({
        day: `Day ${i + 1}`,
        title: item.dayTitle,
        description: item.description,
      })),
    };
  }

  const pkg = getPackageBySlug(destination, slug);
  if (!pkg) return null;
  return {
    title: pkg.title,
    summary: pkg.desc,
    image: pkg.img,
    details: pkg.details ? [pkg.details] : [],
    longDescription: pkg.longDesc,
    itinerary: pkg.itinerary,
  };
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string; slug: string }>;
}): Promise<Metadata> {
  const { destination, slug } = await params;
  if (!isValidDestination(destination)) return {};
  const pkg = await loadPackage(destination, slug);
  if (!pkg) return {};
  const description = (pkg.summary || pkg.longDescription).slice(0, 160) || undefined;
  return {
    title: pageTitle(pkg.title),
    description,
    openGraph: {
      title: pkg.title,
      description,
      images: hasPhoto(pkg.image) ? [pkg.image] : ["/images/hero.jpg"],
      type: "website",
    },
  };
}

const sectionHeading =
  "text-[clamp(1.75rem,3vw,2.6rem)] font-semibold leading-[1.05] tracking-tight text-foreground";

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ destination: string; slug: string }>;
}) {
  const { destination, slug } = await params;
  if (!isValidDestination(destination)) notFound();

  const dest = getDestination(destination)!;
  const pkg = await loadPackage(destination, slug);
  if (!pkg) notFound();

  const photo = hasPhoto(pkg.image);
  const days = pkg.itinerary.length;
  const meta = [days > 0 ? `${days}-day itinerary` : "", ...pkg.details].filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex h-[88svh] min-h-[560px] w-full flex-col justify-end overflow-hidden bg-navy text-white">
        {photo ? (
          <>
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/75 to-transparent" />
          </>
        ) : (
          // No photograph supplied: a quiet typographic mark, not a stock image.
          <span
            aria-hidden
            className="pointer-events-none absolute -right-[2vw] top-[18%] select-none text-[clamp(7rem,26vw,24rem)] font-semibold leading-none tracking-tighter text-navy-foreground/[0.07]"
          >
            {dest.label}
          </span>
        )}

        {/* The site header stays tucked away over the hero, so navigation back lives here */}
        <nav aria-label="Breadcrumb" className="gutter absolute inset-x-0 top-0 z-10 pt-8 md:pt-10">
          <Link
            href={`/${destination}/packages`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All {dest.label} packages
          </Link>
        </nav>

        <div className="gutter relative z-10 pb-[clamp(2.5rem,7vh,5rem)] pt-28">
          <Reveal variant="fade">
            <p className="eyebrow text-white/75">Tour Package · {dest.label}</p>
            <h1 className="mt-5 max-w-5xl text-balance text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
              {pkg.title}
            </h1>
            {meta.length > 0 ? (
              <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
                {meta.join("  ·  ")}
              </p>
            ) : null}
            <a
              href="#enquire"
              className="group mt-8 inline-flex items-center gap-2 border-b border-white/50 pb-1 text-sm font-medium transition-colors hover:border-white"
            >
              Enquire about this trip
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Content + enquiry */}
      <section className="gutter section-y">
        <div className="wide grid gap-16 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          <div className="space-y-[clamp(3.5rem,7vw,6rem)] lg:col-span-7">
            {pkg.longDescription ? (
              <Reveal>
                <h2 className={sectionHeading}>About This Package</h2>
                <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
                  {pkg.longDescription}
                </p>
              </Reveal>
            ) : null}

            {days > 0 ? (
              <div>
                <Reveal>
                  <h2 className={sectionHeading}>Itinerary</h2>
                </Reveal>
                <div className="mt-10 md:mt-12">
                  <ItineraryTimeline items={pkg.itinerary} />
                </div>
              </div>
            ) : null}

            {/* Existing action, kept as a quiet secondary button (no file is wired yet) */}
            <Link
              href="#"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/40 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="size-4" />
              Download Itinerary
            </Link>
          </div>

          {/* Enquiry: sticky only where the viewport is tall enough to hold it */}
          <aside
            id="enquire"
            className="scroll-mt-28 lg:col-span-5 lg:self-start lg:top-28 lg:[@media(min-height:880px)]:sticky"
          >
            <div className="rounded-[1.75rem] border border-border bg-secondary/60 p-6 shadow-sm sm:p-8">
              <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-tight text-foreground">
                Enquire About This Trip
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Share your dates and preferences and we will get back to you.
              </p>
              <div className="mt-7">
                <EnquiryForm
                  variant="editorial"
                  packageName={pkg.title}
                  destination={destination as DestinationSlug}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner destination={destination} destinationLabel={dest.label} />
    </>
  );
}
