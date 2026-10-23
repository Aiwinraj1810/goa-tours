import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Star } from "lucide-react";

import Reveal from "@/components/reveal";

type EnquireBannerProps = {
  image: string;
  imageCaptionTitle: string;
  imageCaptionSubtitle: string;
  heading: string;
  body: string;
  ratingText: string;
  ctaLabel: string;
  ctaHref: string;
  phones: string[];
};

export default function EnquireBanner({
  image,
  imageCaptionTitle,
  imageCaptionSubtitle,
  heading,
  body,
  ratingText,
  ctaLabel,
  ctaHref,
  phones,
}: EnquireBannerProps) {
  return (
    <section className="section-y overflow-hidden bg-background">
      <div className="grid lg:grid-cols-12 lg:items-center">
        {/* Photograph bleeds to the left edge */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary sm:aspect-[5/4] lg:col-span-7 lg:aspect-auto lg:h-[min(84vh,760px)] lg:rounded-r-[2.5rem]">
          <Image
            src={image}
            alt={imageCaptionTitle || heading}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
          {imageCaptionTitle ? (
            <>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 to-transparent" />
              <div className="gutter absolute inset-x-0 bottom-0 pb-8 text-white">
                <p className="text-title">{imageCaptionTitle}</p>
                {imageCaptionSubtitle ? (
                  <p className="mt-1 max-w-md text-sm text-white/80">{imageCaptionSubtitle}</p>
                ) : null}
              </div>
            </>
          ) : null}
        </div>

        {/* Copy panel overlaps the photograph */}
        <Reveal className="relative z-10 mx-[var(--gutter)] -mt-14 bg-secondary p-8 sm:p-12 lg:col-span-6 lg:col-start-7 lg:mx-0 lg:-ml-24 lg:mr-[var(--gutter)] lg:mt-0 lg:p-14">
          {ratingText ? (
            <p className="mb-5 flex items-center gap-2 text-sm font-medium text-foreground">
              <Star className="size-4 fill-highlight text-highlight" />
              {ratingText}
            </p>
          ) : null}
          <h2 className="text-headline text-balance text-foreground">{heading}</h2>
          <p className="measure mt-6 text-muted-foreground md:text-lg">{body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            {ctaLabel ? (
              <Link
                href={ctaHref}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {ctaLabel}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : null}
            {phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                <Phone className="size-4" />
                {phone}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
