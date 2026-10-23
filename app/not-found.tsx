import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Real Goa Holidays",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="gutter flex min-h-[78svh] items-center pb-24 pt-36">
      <div className="wide w-full">
        <p className="eyebrow text-primary">Error 404</p>
        <h1 className="text-headline mt-4 max-w-3xl text-balance text-foreground">
          This page has wandered off the map
        </h1>
        <p className="measure mt-6 text-lg text-muted-foreground">
          The link may be out of date, or the page may have moved. Here are a few good places to
          pick up the trail.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Back to home
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/goa/packages"
            className="border-b border-foreground/40 pb-1 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            Browse packages
          </Link>
          <Link
            href="/goa/contact"
            className="border-b border-foreground/40 pb-1 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
