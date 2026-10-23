import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";

import Reveal from "@/components/reveal";

type TourPackageItem = {
  image: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  badge: string;
  note: string;
};

type TourPackagesGridProps = {
  heading: string;
  moreHref: string;
  packages: TourPackageItem[];
};

export default function TourPackagesGrid({
  heading,
  moreHref,
  packages,
}: TourPackagesGridProps) {
  return (
    <section className="section-y bg-muted/50">
      <div className="gutter wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="text-headline max-w-3xl text-balance text-foreground">{heading}</h2>
          </Reveal>
          {moreHref ? (
            <Link
              href={moreHref}
              className="group inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              View all packages
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>

        {/* Each package is a product sheet: photograph on one side, the
            practical facts on the other, divided by hairlines. */}
        <div className="mt-12 md:mt-16">
          {packages.map((pkg, i) => (
            <Reveal key={i}>
              <article className="grid gap-6 border-t border-border py-8 md:gap-10 lg:grid-cols-12 lg:items-center lg:py-10">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary lg:col-span-5">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="lg:col-span-7 lg:pl-6">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {pkg.location ? (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {pkg.location}
                      </span>
                    ) : null}
                    {pkg.badge ? (
                      <span className="flex items-center gap-1 font-medium text-foreground">
                        <Star className="size-3.5 fill-highlight text-highlight" />
                        {pkg.badge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-headline mt-4 text-balance text-foreground">{pkg.title}</h3>

                  <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 sm:max-w-md">
                    {pkg.duration ? (
                      <div>
                        <dt className="eyebrow text-muted-foreground">Duration</dt>
                        <dd className="mt-1.5 text-lg font-medium text-foreground">{pkg.duration}</dd>
                      </div>
                    ) : null}
                    {pkg.price ? (
                      <div>
                        <dt className="eyebrow text-muted-foreground">Per person</dt>
                        <dd className="mt-1.5 text-lg font-semibold text-primary">{pkg.price}</dd>
                      </div>
                    ) : null}
                  </dl>

                  {pkg.note ? (
                    <p className="mt-5 text-sm text-muted-foreground">{pkg.note}</p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
