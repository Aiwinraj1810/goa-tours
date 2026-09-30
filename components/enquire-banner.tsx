import Image from "next/image";
import Link from "next/link";
import { Phone, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

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
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-3xl md:h-96">
          <Image src={image} alt={heading} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          {imageCaptionTitle ? (
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="text-lg font-semibold">{imageCaptionTitle}</p>
              {imageCaptionSubtitle ? (
                <p className="text-sm text-white/80">{imageCaptionSubtitle}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div>
          {ratingText ? (
            <div className="mb-3 flex items-center gap-2">
              <Star className="size-4 fill-highlight text-highlight" />
              <span className="text-sm font-semibold text-foreground">{ratingText}</span>
            </div>
          ) : null}
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">{heading}</h2>
          <p className="mt-4 text-muted-foreground">{body}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {ctaLabel ? (
              <Link href={ctaHref}>
                <Button className="bg-primary text-primary-foreground hover:opacity-90">
                  {ctaLabel}
                </Button>
              </Link>
            ) : null}
            {phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <Phone className="size-4" />
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
