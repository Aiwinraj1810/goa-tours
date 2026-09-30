import Link from "next/link";

import { Button } from "@/components/ui/button";
import { resolveIcon } from "@/components/icon-map";

type FeatureItem = {
  icon: string;
  label: string;
};

type FeaturesGridProps = {
  heading: string;
  subheading: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  features: FeatureItem[];
};

export default function FeaturesGrid({
  heading,
  subheading,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  features,
}: FeaturesGridProps) {
  return (
    <section className="bg-navy py-16 text-navy-foreground">
      <div className="mx-auto max-w-7xl px-5 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">{heading}</h2>
        {subheading ? (
          <p className="mx-auto mt-3 max-w-2xl text-navy-foreground/70">{subheading}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {primaryCtaLabel ? (
            <Link href={primaryCtaHref}>
              <Button className="bg-navy-foreground text-navy hover:opacity-90">
                {primaryCtaLabel}
              </Button>
            </Link>
          ) : null}
          {secondaryCtaLabel ? (
            <Link href={secondaryCtaHref}>
              <Button
                variant="outline"
                className="border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10"
              >
                {secondaryCtaLabel}
              </Button>
            </Link>
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = resolveIcon(feature.icon);
            return (
              <div key={i} className="flex flex-col items-center gap-3">
                <span className="flex size-14 items-center justify-center rounded-full bg-navy-foreground/10">
                  <Icon className="size-6 text-navy-foreground" />
                </span>
                <span className="text-sm font-medium text-navy-foreground/90">
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
