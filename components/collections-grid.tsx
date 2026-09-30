import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type CollectionItem = {
  image: string;
  name: string;
  rating: string;
  startingPrice: string;
  href: string;
};

type CollectionsGridProps = {
  heading: string;
  items: CollectionItem[];
};

export default function CollectionsGrid({ heading, items }: CollectionsGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className="text-3xl font-semibold text-foreground md:text-4xl">{heading}</h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <Link key={i} href={item.href} className="group block">
            <div className="relative h-56 w-full overflow-hidden rounded-3xl">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{item.name}</span>
                {item.rating ? (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="size-4 fill-highlight text-highlight" />
                    {item.rating}
                  </span>
                ) : null}
              </div>
              {item.startingPrice ? (
                <p className="text-sm text-muted-foreground">
                  Starting per person{" "}
                  <span className="font-semibold text-primary">{item.startingPrice}</span>
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
