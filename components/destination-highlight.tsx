import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

type DestinationTile = {
  image: string;
  name: string;
  subtitle: string;
  href: string;
};

type DestinationHighlightProps = {
  bannerImage: string;
  bannerBadge: string;
  bannerEyebrow: string;
  bannerTitle: string;
  bannerTags: string[];
  bannerPriceLabel: string;
  bannerNote: string;
  bannerCtaLabel: string;
  bannerCtaHref: string;
  moreHref: string;
  tiles: DestinationTile[];
};

export default function DestinationHighlight({
  bannerImage,
  bannerBadge,
  bannerEyebrow,
  bannerTitle,
  bannerTags,
  bannerPriceLabel,
  bannerNote,
  bannerCtaLabel,
  bannerCtaHref,
  moreHref,
  tiles,
}: DestinationHighlightProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8">
      <div className="relative h-[360px] w-full overflow-hidden rounded-3xl md:h-[420px]">
        <Image src={bannerImage} alt={bannerTitle} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col justify-center gap-3 p-8 text-white">
          <div className="flex items-center gap-2">
            {bannerBadge ? (
              <span className="flex items-center gap-1 rounded-full bg-highlight px-3 py-1 text-xs font-semibold text-highlight-foreground">
                <Star className="size-3 fill-current" />
                {bannerBadge}
              </span>
            ) : null}
            {bannerEyebrow ? (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                {bannerEyebrow}
              </span>
            ) : null}
          </div>

          <h2 className="text-3xl font-semibold md:text-5xl">{bannerTitle}</h2>

          {bannerTags.length > 0 ? (
            <p className="text-sm text-white/75">{bannerTags.join(" · ")}</p>
          ) : null}

          {bannerPriceLabel ? (
            <p className="text-sm font-medium text-white/90">{bannerPriceLabel}</p>
          ) : null}

          <div className="mt-2 flex items-center gap-3">
            {bannerCtaLabel ? (
              <Link href={bannerCtaHref}>
                <Button className="bg-highlight text-highlight-foreground hover:opacity-90">
                  {bannerCtaLabel}
                </Button>
              </Link>
            ) : null}
            {bannerNote ? (
              <span className="text-xs text-white/60">{bannerNote}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {tiles.map((tile, i) => (
          <div key={i} className="relative h-56 overflow-hidden rounded-3xl">
            <Image src={tile.image} alt={tile.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <div>
                <span className="block text-lg font-semibold text-white">{tile.name}</span>
                {tile.subtitle ? (
                  <span className="text-xs text-white/70">{tile.subtitle}</span>
                ) : null}
              </div>
              <Link href={tile.href}>
                <Button size="sm" className="bg-white text-foreground hover:bg-white/90">
                  Visit
                </Button>
              </Link>
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
            <span className="font-semibold text-foreground">See more Destination</span>
            <span className="text-sm text-muted-foreground">
              Your pick from 100+ destinations
            </span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
