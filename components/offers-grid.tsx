import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/reveal";

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

function OfferAction({ offer, tone }: { offer: OfferItem; tone: "light" | "dark" }) {
  if (!offer.ctaLabel && !offer.validity) return null;
  const onPhoto = tone === "light";
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
      {offer.ctaLabel ? (
        <Link
          href={offer.ctaHref}
          className={`group inline-flex items-center gap-2 border-b pb-0.5 font-medium transition-colors ${
            onPhoto
              ? "border-white/60 text-white hover:border-white"
              : "border-foreground/40 text-foreground hover:border-foreground"
          }`}
        >
          {offer.ctaLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
      {offer.validity ? (
        <span className={onPhoto ? "text-white/70" : "text-muted-foreground"}>
          {offer.validity}
        </span>
      ) : null}
    </div>
  );
}

export default function OffersGrid({ heading, subheading, offers }: OffersGridProps) {
  const [lead, ...rest] = offers;
  if (!lead) return null;

  return (
    <section className="section-y bg-background">
      <div className="gutter wide">
        <Reveal className="max-w-3xl">
          <h2 className="text-headline text-balance text-foreground">{heading}</h2>
          {subheading ? (
            <p className="measure mt-4 text-lg text-muted-foreground">{subheading}</p>
          ) : null}
        </Reveal>

        {/* Layout follows the number of offers: one feature, two halves,
            or a lead offer with a supporting list. */}
        <div
          className={`mt-12 grid gap-8 md:mt-16 lg:gap-10 ${
            rest.length === 0
              ? ""
              : rest.length === 1
                ? "md:grid-cols-2"
                : "lg:grid-cols-12"
          }`}
        >
          {/* Lead offer — photograph and title are the focus */}
          <Reveal className={rest.length > 1 ? "lg:col-span-7 lg:h-full" : ""}>
            <div
              className={`relative w-full overflow-hidden bg-navy ${
                rest.length === 0
                  ? "aspect-[16/8]"
                  : rest.length === 1
                    ? "aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/3]"
                    : "aspect-[4/5] md:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[32rem]"
              }`}
            >
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-24 text-white sm:p-10 sm:pt-32">
                {lead.badge ? <p className="eyebrow mb-3 text-white/80">{lead.badge}</p> : null}
                <h3 className="text-headline max-w-xl text-balance">{lead.title}</h3>
                {lead.subtitle ? (
                  <p className="mt-3 max-w-md text-sm text-white/85 md:text-base">{lead.subtitle}</p>
                ) : null}
                <OfferAction offer={lead} tone="light" />
              </div>
            </div>
          </Reveal>

          {/* Supporting offers */}
          {rest.length === 1 ? (
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy md:aspect-auto md:h-full md:min-h-[24rem]">
                <Image
                  src={rest[0].image}
                  alt={rest[0].title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-24 text-white sm:p-10 sm:pt-32">
                  {rest[0].badge ? (
                    <p className="eyebrow mb-3 text-white/80">{rest[0].badge}</p>
                  ) : null}
                  <h3 className="text-headline max-w-xl text-balance">{rest[0].title}</h3>
                  {rest[0].subtitle ? (
                    <p className="mt-3 max-w-md text-sm text-white/85 md:text-base">
                      {rest[0].subtitle}
                    </p>
                  ) : null}
                  <OfferAction offer={rest[0]} tone="light" />
                </div>
              </div>
            </Reveal>
          ) : rest.length > 1 ? (
            <ul className="flex flex-col lg:col-span-5 lg:h-full lg:justify-between">
              {rest.map((offer, i) => (
                <li key={i} className="border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0">
                  <Reveal delay={i * 0.06}>
                    <div className="flex gap-5">
                      <div className="relative aspect-square w-28 shrink-0 overflow-hidden bg-secondary sm:w-36">
                        <Image
                          src={offer.image}
                          alt={offer.title}
                          fill
                          sizes="144px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        {offer.badge ? (
                          <p className="eyebrow mb-2 text-accent-strong">{offer.badge}</p>
                        ) : null}
                        <h3 className="text-title text-foreground">{offer.title}</h3>
                        {offer.subtitle ? (
                          <p className="mt-1.5 text-sm text-muted-foreground">{offer.subtitle}</p>
                        ) : null}
                        <OfferAction offer={offer} tone="dark" />
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
