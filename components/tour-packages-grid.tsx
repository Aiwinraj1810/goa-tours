import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

type TourPackageItem = {
  image: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  badge: string;
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
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
        {heading}
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
              {pkg.badge ? (
                <span className="absolute left-4 top-4 rounded-full bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">
                  {pkg.badge}
                </span>
              ) : null}
            </div>
            <div className="space-y-2 p-5">
              <h3 className="text-lg font-semibold text-foreground">{pkg.title}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                <span>{pkg.location}</span>
                {pkg.duration ? <span>· {pkg.duration}</span> : null}
              </div>
              <p className="pt-1 text-lg font-bold text-primary">{pkg.price}</p>
            </div>
          </div>
        ))}

        {moreHref ? (
          <Link
            href={moreHref}
            className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-muted p-8 text-center transition-colors hover:bg-secondary"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <ArrowUpRight className="size-6" />
            </span>
            <span className="font-semibold text-foreground">See more packages</span>
            <span className="text-sm text-muted-foreground">
              100+ handpicked getaways waiting
            </span>
            <Button variant="outline" size="sm">
              See more packages
            </Button>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
