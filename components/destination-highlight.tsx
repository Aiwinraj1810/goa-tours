import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type DestinationTile = {
  image: string;
  name: string;
  href: string;
};

type DestinationHighlightProps = {
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerTags: string[];
  bannerCtaLabel: string;
  bannerCtaHref: string;
  moreHref: string;
  tiles: DestinationTile[];
};

export default function DestinationHighlight({
  bannerImage,
  bannerTitle,
  bannerSubtitle,
  bannerTags,
  bannerCtaLabel,
  bannerCtaHref,
  moreHref,
  tiles,
}: DestinationHighlightProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8">
      <div className="relative h-[360px] w-full overflow-hidden rounded-3xl md:h-[420px]">
        <Image src={bannerImage} alt={bannerTitle} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end gap-3 p-8 text-white">
          {bannerTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {bannerTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <h2 className="text-3xl font-semibold md:text-5xl">{bannerTitle}</h2>
          <p className="max-w-xl text-white/80">{bannerSubtitle}</p>
          {bannerCtaLabel ? (
            <Link href={bannerCtaHref} className="mt-2 w-fit">
              <Button className="bg-highlight text-highlight-foreground hover:opacity-90">
                {bannerCtaLabel}
              </Button>
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {tiles.map((tile, i) => (
          <div key={i} className="relative h-56 overflow-hidden rounded-3xl">
            <Image src={tile.image} alt={tile.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
              <span className="text-lg font-semibold text-white">{tile.name}</span>
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
