import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/reveal";
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
    <section className="section-y bg-navy text-navy-foreground">
      <div className="gutter wide grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Statement */}
        <Reveal className="lg:col-span-6">
          <h2 className="text-headline max-w-2xl text-balance">{heading}</h2>
          {subheading ? (
            <p className="measure mt-6 text-lg text-navy-foreground/70">{subheading}</p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {primaryCtaLabel ? (
              <Link
                href={primaryCtaHref}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-navy-foreground px-7 text-sm font-medium text-navy transition-opacity hover:opacity-90"
              >
                {primaryCtaLabel}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : null}
            {secondaryCtaLabel ? (
              <Link
                href={secondaryCtaHref}
                className="border-b border-navy-foreground/40 pb-1 text-sm font-medium transition-colors hover:border-navy-foreground"
              >
                {secondaryCtaLabel}
              </Link>
            ) : null}
          </div>
        </Reveal>

        {/* Benefits as an editorial ledger */}
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {features.map((feature, i) => {
            const Icon = resolveIcon(feature.icon);
            return (
              <li key={i}>
                <Reveal delay={(i % 2) * 0.08}>
                  <div className="group flex items-center gap-5 border-t border-navy-foreground/15 py-6">
                    <Icon
                      className="size-6 shrink-0 text-navy-foreground/60 transition-colors group-hover:text-navy-foreground"
                      strokeWidth={1.4}
                    />
                    <span className="text-lg font-medium">{feature.label}</span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
