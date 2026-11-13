import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { getDestination, isValidDestination } from "@/lib/destinations";
import { getPublishedPackagesByDestination, getSiteSettings } from "@/lib/cms";
import { CONTACT } from "@/lib/constants";
import Reveal from "@/components/reveal";
import { hasPhoto } from "@/lib/utils";
import { pageTitle } from "@/lib/site";

// One shape for the listing, whichever source the packages come from.
// Optional fields stay empty and are simply not rendered.
type ListedPackage = {
  slug: string;
  title: string;
  image: string;
  summary: string;
  details: string[];
  days: number;
};

function PackageImage({
  image,
  title,
  label,
  sizes,
}: {
  image: string;
  title: string;
  label: string;
  sizes: string;
}) {
  if (hasPhoto(image)) {
    return (
      <Image
        src={image}
        alt={title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
    );
  }
  // No photograph supplied: a quiet typographic panel rather than a fake image.
  return (
    <div className="absolute inset-0 flex items-end overflow-hidden bg-navy p-6 text-navy-foreground">
      <span className="text-[clamp(3rem,9vw,7rem)] font-semibold leading-none tracking-tighter text-navy-foreground/15">
        {label}
      </span>
    </div>
  );
}

function ViewDetails({ href, large = false }: { href: string; large?: boolean }) {
  return (
    <Link
      href={href}
      className={`group/cta inline-flex items-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 ${
        large ? "h-12 px-8" : "h-11 px-6"
      }`}
    >
      View Details
      <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
    </Link>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destination: string }>;
}): Promise<Metadata> {
  const { destination } = await params;
  const dest = getDestination(destination);
  if (!dest) return {};
  return {
    title: pageTitle(`Tour Packages in ${dest.label}`),
    description: `Browse ${dest.label} tour packages from Real Goa Holidays, from quick escapes to full adventures.`,
  };
}

export default async function DestinationPackagesPage({
  params,
}: {
  params: Promise<{ destination: string }>;
}) {
  const { destination } = await params;
  if (!isValidDestination(destination)) notFound();

  const dest = getDestination(destination)!;

  const [cmsPackages, settings] = await Promise.all([
    getPublishedPackagesByDestination(destination).catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  // CMS packages are the source of truth; code content is only a fallback
  // when nothing has been published for this destination.
  const packages: ListedPackage[] =
    cmsPackages.length > 0
      ? cmsPackages.map((pkg) => ({
          slug: pkg.slug,
          title: pkg.title,
          image: pkg.heroImage ?? "",
          summary: pkg.summary ?? "",
          details: (pkg.details ?? []).filter(Boolean),
          days: pkg.itinerary?.length ?? 0,
        }))
      : dest.packages.map((pkg) => ({
          slug: pkg.slug,
          title: pkg.title,
          image: pkg.img,
          summary: pkg.desc,
          details: pkg.details ? [pkg.details] : [],
          days: pkg.itinerary?.length ?? 0,
        }));

  const phone = settings?.phones?.[0] || CONTACT.phones[0].value;
  const hrefFor = (slug: string) => `/${destination}/packages/${slug}`;
  const count = String(packages.length).padStart(2, "0");

  return (
    <>
      {/* 1 — Introduction */}
      <section className="gutter pb-12 pt-32 md:pb-16 md:pt-44">
        <div className="wide grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-primary">Tour Packages</p>
            <h1 className="text-headline mt-4 max-w-4xl text-balance text-foreground">
              Find your way to {dest.label}
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="measure text-muted-foreground md:text-lg">
              From quick escapes to full adventures — find the {dest.label} experience that
              fits you perfectly.
            </p>
            {packages.length > 0 ? (
              <p className="mt-5 text-sm tabular-nums text-muted-foreground">
                {count} {packages.length === 1 ? "package" : "packages"}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* 2 — Package browsing */}
      <section className="bg-muted/50 py-[clamp(3rem,7vw,7rem)]">
        {packages.length > 0 ? (
          <div className="space-y-[clamp(3.5rem,7vw,7rem)]">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.slug}>
                {/* Every package shares this layout: photograph bleeds to the right edge */}
                <article className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-0">
                  <Link
                    href={hrefFor(pkg.slug)}
                    tabIndex={-1}
                    aria-hidden
                    className="relative block aspect-[4/3] w-full overflow-hidden bg-secondary lg:order-2 lg:col-span-7 lg:aspect-auto lg:h-[min(72vh,660px)] lg:rounded-l-[2.5rem]"
                  >
                    <PackageImage
                      image={pkg.image}
                      title={pkg.title}
                      label={dest.label}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                    />
                  </Link>

                  <div className="gutter lg:order-1 lg:col-span-5 lg:pr-14">
                    <p className="text-sm tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 text-balance text-[clamp(1.9rem,3.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
                      {pkg.title}
                    </h2>
                    {pkg.summary ? (
                      <p className="measure mt-5 text-muted-foreground md:text-lg">
                        {pkg.summary}
                      </p>
                    ) : null}

                    {pkg.details.length > 0 || pkg.days > 0 ? (
                      <ul className="mt-8 border-b border-border">
                        {pkg.days > 0 ? (
                          <li className="border-t border-border py-3 text-sm font-medium text-foreground">
                            {pkg.days}-day itinerary
                          </li>
                        ) : null}
                        {pkg.details.map((detail, k) => (
                          <li
                            key={k}
                            className="border-t border-border py-3 text-sm text-muted-foreground"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-9">
                      <ViewDetails href={hrefFor(pkg.slug)} large />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="gutter wide">
            <p className="measure text-lg text-muted-foreground">
              No packages are published for {dest.label} yet. Please check back soon, or get in
              touch and we will plan something with you.
            </p>
          </div>
        )}
      </section>

      {/* 3 — Next step */}
      <section className="section-y gutter bg-secondary text-foreground">
        <div className="wide grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="text-headline max-w-3xl text-balance">
              Not sure which package suits you?
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="measure text-muted-foreground md:text-lg">
              Tell us when you are travelling and what you enjoy, and we will help you choose.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={`/${destination}/contact`}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Plan Your Trip
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-4" />
                {phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
