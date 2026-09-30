import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type CollectionItem = {
  image: string;
  name: string;
  description: string;
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
              {item.rating ? (
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground">
                  <Star className="size-3 fill-highlight text-highlight" />
                  {item.rating}
                </span>
              ) : null}
            </div>
            <div className="mt-3 space-y-1">
              <span className="font-semibold text-foreground">{item.name}</span>
              {item.description ? (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              ) : null}
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
