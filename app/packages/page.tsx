import Image from "next/image";
import Link from "next/link";
import { packages } from "@/lib/packages";
import { Button } from "@/components/ui/button";
import CommonContainer from "@/components/CommonConatiner";

export default function PackagesPage() {
  return (
    <CommonContainer>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold mb-2 text-balance">
          Tour Packages
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-12">
          From quick beach escapes to full heritage adventures — find the Goa
          experience that fits you perfectly.
        </p>

        <div className="grid gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              className="group overflow-hidden rounded-2xl bg-card border shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row"
            >
              {/* Image — full width on mobile, 45% on desktop */}
              <div className="relative h-56 w-full shrink-0 md:h-auto md:w-[45%] overflow-hidden">
                <Image
                  src={pkg.img}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center p-6 md:p-10">
                <h2 className="text-xl font-semibold mb-3 text-foreground">
                  {pkg.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-2">{pkg.desc}</p>
                <p className="text-xs text-foreground/70 mb-8">{pkg.details}</p>
                <Link href={`/packages/${pkg.slug}`} className="md:self-start">
                  <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:opacity-90">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommonContainer>
  );
}
