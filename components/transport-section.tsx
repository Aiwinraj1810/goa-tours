"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/reveal";
import type { EnquiryLink } from "@/components/block-renderer";
import { cn } from "@/lib/utils";
import type { TransportEntry } from "@/lib/destinations/types";

type Props = {
  transport: TransportEntry[];
  destinationLabel: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  enquiry?: EnquiryLink;
};

type Kind = NonNullable<TransportEntry["kind"]>;

const ease = [0.22, 1, 0.36, 1] as const;

// Fixed interface labels; which tabs appear depends on the CMS entries' type.
const TABS: Array<{ kind: Kind; label: string }> = [
  { kind: "airport", label: "By air" },
  { kind: "railway", label: "By rail" },
  { kind: "port", label: "By sea" },
  { kind: "bus", label: "By road" },
  { kind: "other", label: "Other options" },
];

const isSafeMapUrl = (url: string) => /^https:\/\//i.test(url);

function Serves({ serves }: { serves?: string[] }) {
  const list = (serves ?? []).filter(Boolean);
  if (list.length === 0) return null;
  return (
    <p className="mt-2 text-sm text-muted-foreground">
      <span className="eyebrow mr-2 text-accent-strong">For</span>
      {list.join(" · ")}
    </p>
  );
}

function MapLink({ entry }: { entry: TransportEntry }) {
  if (!entry.mapEmbedUrl || !isSafeMapUrl(entry.mapEmbedUrl)) return null;
  return (
    <details className="mt-3">
      <summary className="inline-block cursor-pointer list-none border-b border-foreground/30 pb-0.5 text-sm font-medium transition-colors hover:border-foreground">
        View on map
      </summary>
      <div className="mt-3 h-56 overflow-hidden rounded-2xl bg-secondary">
        <iframe
          src={entry.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map — ${entry.name}`}
        />
      </div>
    </details>
  );
}

/** Airports: large, side by side, code in display type. */
function Airports({ entries }: { entries: TransportEntry[] }) {
  return (
    <ul className="grid gap-x-16 gap-y-10 md:grid-cols-2">
      {entries.map((a, i) => (
        <li
          key={`${a.name}-${i}`}
          className="border-t border-foreground/20 pt-6 md:[&:nth-child(even)]:border-l md:[&:nth-child(even)]:pl-12"
        >
          {a.code ? (
            <p
              aria-label={`Airport code ${a.code}`}
              className="text-[clamp(3.75rem,9vw,7.5rem)] font-semibold leading-[0.8] tracking-tighter text-accent"
            >
              {a.code}
            </p>
          ) : null}
          <h3 className="text-title mt-5 text-balance">{a.name}</h3>
          {a.location ? <p className="eyebrow mt-2 text-muted-foreground">{a.location}</p> : null}
          {a.description ? (
            <p className="measure mt-3 text-muted-foreground">{a.description}</p>
          ) : null}
          <Serves serves={a.serves} />
          <MapLink entry={a} />
        </li>
      ))}
    </ul>
  );
}

/** Stations, ports, buses and anything else: a compact code + name list. */
function Index({ entries }: { entries: TransportEntry[] }) {
  return (
    <ul className="grid gap-x-16 border-t border-foreground/20 md:grid-cols-2">
      {entries.map((s, i) => (
        <li
          key={`${s.name}-${i}`}
          className="grid grid-cols-[4rem_1fr] gap-x-4 border-b border-border py-5 sm:grid-cols-[4.75rem_1fr]"
        >
          <span className="pt-0.5 text-base font-semibold tabular-nums tracking-[0.12em] text-accent-strong sm:text-lg">
            {s.code || ""}
          </span>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-snug tracking-tight">{s.name}</h3>
            {s.location ? <p className="text-sm text-muted-foreground">{s.location}</p> : null}
            {s.description ? (
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            ) : null}
            <Serves serves={s.serves} />
            <MapLink entry={s} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function TransportSection({
  transport,
  destinationLabel,
  eyebrow,
  heading,
  subheading,
  ctaText,
  enquiry,
}: Props) {
  // Entries without a recognised type fall under "Other options".
  const known = new Set<string>(TABS.map((t) => t.kind));
  const kindOf = (e: TransportEntry): Kind =>
    e.kind && known.has(e.kind) ? e.kind : "other";

  const tabs = TABS.map((t) => ({
    ...t,
    entries: transport.filter((e) => kindOf(e) === t.kind),
  })).filter((t) => t.entries.length > 0);

  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = tabs[Math.min(active, tabs.length - 1)];
  if (!current) return null;

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="bg-background pb-[clamp(3.5rem,6vw,6rem)] pt-[clamp(1.5rem,3vw,3rem)]">
      {/* The hairline marks the start of this section; the section above already
          supplies its own bottom padding, so there is no extra top gap here. */}
      <div className="gutter wide">
        <div className="border-t border-border pt-[clamp(2.5rem,5vw,4.5rem)]">
          <Reveal className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <p className="eyebrow text-primary">{eyebrow || "Getting there"}</p>
              <h2 className="text-headline mt-3 text-balance text-foreground">
                {heading || `How to reach ${destinationLabel}`}
              </h2>
            </div>
            {subheading ? (
              <p className="measure text-lg text-muted-foreground lg:col-span-5 lg:justify-self-end">
                {subheading}
              </p>
            ) : null}
          </Reveal>

          {/* Mode of travel, set like the region switch in Explore Goa */}
          {tabs.length > 1 ? (
            <div className="-mx-[var(--gutter)] mt-10 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] lg:mt-14">
              <div role="tablist" aria-label="How to arrive" className="flex gap-x-8">
                {tabs.map((t, i) => {
                  const selected = t === current;
                  return (
                    <button
                      key={t.kind}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      role="tab"
                      id={`transport-tab-${t.kind}`}
                      aria-selected={selected}
                      aria-controls="transport-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className={cn(
                        "relative shrink-0 whitespace-nowrap pb-2 text-[clamp(1.4rem,2.6vw,2.25rem)] font-semibold leading-none tracking-tight transition-colors",
                        selected ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                      )}
                    >
                      {t.label}
                      {selected ? (
                        <motion.span
                          layoutId="transport-underline"
                          className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                          transition={{ duration: 0.4, ease }}
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div
            role="tabpanel"
            id="transport-panel"
            aria-labelledby={tabs.length > 1 ? `transport-tab-${current.kind}` : undefined}
            className="mt-8 lg:mt-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.kind}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
              >
                {current.kind === "airport" ? (
                  <Airports entries={current.entries} />
                ) : (
                  <Index entries={current.entries} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {enquiry?.href ? (
            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:mt-14">
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
      </div>
    </section>
  );
}
