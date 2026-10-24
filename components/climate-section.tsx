"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/reveal";
import type { EnquiryLink } from "@/components/block-renderer";
import { cn } from "@/lib/utils";
import type { ClimateEntry } from "@/lib/destinations/types";

type Props = {
  climate: ClimateEntry[];
  destinationLabel: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  enquiry?: EnquiryLink;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ease = [0.22, 1, 0.36, 1] as const;

type Season = NonNullable<ClimateEntry["season"]>;

const seasonStyle: Record<Season, string> = {
  best: "bg-primary",
  hot: "bg-secondary border border-foreground/25 [background-image:repeating-linear-gradient(135deg,transparent_0_5px,color-mix(in_oklab,var(--foreground)_22%,transparent)_5px_6px)]",
  monsoon: "bg-accent/30 border border-accent",
  other: "bg-foreground/15",
};

/**
 * Converts the CMS month range into [from, to] positions on a 0–12 axis.
 * Start 9 = the beginning of September (8); end 3.5 = mid-March (2.5); a whole
 * end month runs to its last day. When the range wraps over the new year it is
 * split into two segments.
 */
function toSegments(entry: ClimateEntry): Array<[number, number]> {
  const { startMonth: s, endMonth: e } = entry;
  const valid = (n: unknown): n is number =>
    typeof n === "number" && Number.isFinite(n) && n >= 1 && n <= 12;
  if (!valid(s) || !valid(e)) return [];
  const from = s - 1;
  const to = Number.isInteger(e) ? e : e - 1;
  if (from <= to) return [[from, to]];
  return [
    [from, 12],
    [0, to],
  ];
}

function Swatch({ season }: { season: Season }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block h-2 w-8 shrink-0 rounded-full", seasonStyle[season])}
    />
  );
}

export default function ClimateSection({
  climate,
  destinationLabel,
  eyebrow,
  heading,
  subheading,
  ctaText,
  enquiry,
}: Props) {
  const bestIndex = Math.max(
    0,
    climate.findIndex((c) => c.season === "best")
  );
  const best = climate.find((c) => c.season === "best");
  const [selected, setSelected] = useState(bestIndex);
  const current = climate[Math.min(selected, climate.length - 1)];
  const anyPlotted = climate.some((c) => toSegments(c).length > 0);

  return (
    <section className="bg-muted py-[clamp(3.5rem,6vw,6rem)]">
      <div className="gutter wide">
        <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow text-primary">{eyebrow || "Plan your timing"}</p>
            <h2 className="text-headline mt-3 text-balance text-foreground">
              {heading || `Best time to visit ${destinationLabel}`}
            </h2>
          </div>
          {subheading ? (
            <p className="measure text-lg text-muted-foreground lg:col-span-5 lg:justify-self-end">
              {subheading}
            </p>
          ) : null}
        </Reveal>

        {best ? (
          <div className="mt-10 lg:mt-14">
            {best.summary ? (
              <p className="eyebrow flex items-center gap-3 text-primary">
                <Swatch season="best" />
                {best.summary}
              </p>
            ) : null}
            <p className="text-display mt-3 text-balance text-primary">{best.period}</p>
          </div>
        ) : null}

        <div className="mt-10 lg:mt-12">
          {anyPlotted ? (
            <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:thin]">
              <div className="min-w-[40rem]">
                <div
                  aria-hidden
                  className="grid grid-cols-12 border-b border-foreground/20 pb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  {MONTHS.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>

                <div className="relative">
                  <div aria-hidden className="absolute inset-0 grid grid-cols-12">
                    {MONTHS.map((m) => (
                      <span key={m} className="border-l border-border first:border-l-0" />
                    ))}
                  </div>

                  <div role="group" aria-label="Seasons" className="relative">
                    {climate.map((c, i) => {
                      const season = c.season ?? "other";
                      const active = i === selected;
                      return (
                        <button
                          key={`${c.period}-${i}`}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelected(i)}
                          className={cn(
                            "block w-full py-4 text-left outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-ring",
                            active ? "opacity-100" : "opacity-55 hover:opacity-90"
                          )}
                        >
                          <span className="sticky left-0 mb-2 block w-max text-sm font-semibold text-foreground">
                            {c.summary || c.period}
                            {c.summary ? (
                              <span className="ml-3 font-normal text-muted-foreground">
                                {c.period}
                              </span>
                            ) : null}
                          </span>
                          <span className="relative block h-4 w-full">
                            {toSegments(c).map(([from, to], k) => (
                              <span
                                key={k}
                                aria-hidden
                                className={cn(
                                  "absolute inset-y-0 rounded-full transition-shadow duration-300",
                                  seasonStyle[season],
                                  active && "shadow-[0_0_0_3px_var(--background),0_0_0_4px_var(--foreground)]"
                                )}
                                style={{
                                  left: `${(from / 12) * 100}%`,
                                  width: `${Math.max(((to - from) / 12) * 100, 1.5)}%`,
                                }}
                              />
                            ))}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div role="group" aria-label="Seasons" className="flex flex-wrap gap-2">
              {climate.map((c, i) => (
                <button
                  key={`${c.period}-${i}`}
                  type="button"
                  aria-pressed={i === selected}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "h-11 rounded-full border px-5 text-sm font-medium transition-colors",
                    i === selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-foreground/20 hover:border-foreground"
                  )}
                >
                  {c.summary || c.period}
                </button>
              ))}
            </div>
          )}

          {/* The selected season's description sits directly under the timeline. */}
          {current ? (
            <div aria-live="polite" className="mt-6 border-t border-foreground/20 pt-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selected}
                  className="grid gap-3 lg:grid-cols-12 lg:gap-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <div className="lg:col-span-5">
                    <p className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                      <Swatch season={current.season ?? "other"} />
                      {current.summary || current.period}
                    </p>
                    {current.summary ? (
                      <p className="mt-1 text-sm text-muted-foreground lg:pl-11">{current.period}</p>
                    ) : null}
                  </div>
                  {current.description ? (
                    <p className="measure text-muted-foreground lg:col-span-7">
                      {current.description}
                    </p>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}
        </div>

        {enquiry?.href ? (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
            {ctaText ? <p className="measure text-muted-foreground">{ctaText}</p> : <span />}
            <Link
              href={enquiry.href}
              className="group inline-flex w-fit items-center gap-2 border-b border-foreground/40 pb-1 text-sm font-medium transition-colors hover:border-foreground"
            >
              {enquiry.label || "Enquire"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
