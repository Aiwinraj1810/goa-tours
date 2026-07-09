import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getDestination,
  getPackageBySlug,
  isValidDestination,
  destinations,
} from "@/lib/destinations";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import CtaBanner from "@/components/cta-banner";
import EnquiryForm from "@/components/enquiry-form";
import ItineraryTimeline from "@/components/itinerary-timeline";
import type { DestinationSlug } from "@/lib/destinations/types";

export function generateStaticParams() {
  const params: { destination: string; slug: string }[] = [];
  for (const dest of Object.values(destinations)) {
    for (const pkg of dest.packages) {
      params.push({ destination: dest.slug, slug: pkg.slug });
    }
  }
  return params;
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ destination: string; slug: string }>;
}) {
  const { destination, slug } = await params;
  if (!isValidDestination(destination)) notFound();

  const dest = getDestination(destination)!;
  const pkg = getPackageBySlug(destination, slug);
  if (!pkg) notFound();

  return (
    <>
      <section className="relative h-[100svh] w-full overflow-hidden">
        <Image
          src={pkg.img}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end px-8 pb-10 md:px-16 md:pb-14 text-white">
          <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
            Tour Package
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            {pkg.title}
          </h1>
          <p className="mt-3 text-white/75 text-sm md:text-base max-w-xl">
            {pkg.details}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_420px] items-start">
        <div>
          <h2 className="text-2xl font-semibold mb-4">About This Package</h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            {pkg.longDesc}
          </p>
          <h2 className="text-2xl font-semibold mb-8">Itinerary</h2>
          <ItineraryTimeline items={pkg.itinerary} />
          <Link href="#">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Itinerary
            </Button>
          </Link>
        </div>

        <div className="sticky top-8">
          <h2 className="text-2xl font-semibold mb-4">Enquire About This Trip</h2>
          <EnquiryForm
            packageName={pkg.title}
            destination={destination as DestinationSlug}
          />
        </div>
      </section>

      <CtaBanner destination={destination} destinationLabel={dest.label} />
    </>
  );
}
