import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type OfferItem = {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  validity: string;
};

type OffersGridProps = {
  heading: string;
  subheading: string;
  offers: OfferItem[];
};

export default function OffersGrid({ heading, subheading, offers }: OffersGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className="text-3xl font-semibold text-foreground md:text-4xl">{heading}</h2>
      {subheading ? <p className="mt-2 text-muted-foreground">{subheading}</p> : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {offers.map((offer, i) => (
          <div
            key={i}
            className="flex gap-4 overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl">
              <Image src={offer.image} alt={offer.title} fill className="object-cover" />
              {offer.badge ? (
                <span className="absolute left-2 top-2 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                  {offer.badge}
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{offer.title}</h3>
                <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                {offer.validity ? (
                  <span className="text-xs text-muted-foreground">{offer.validity}</span>
                ) : (
                  <span />
                )}
                {offer.ctaLabel ? (
                  <Link href={offer.ctaHref}>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90">
                      {offer.ctaLabel}
                    </Button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
