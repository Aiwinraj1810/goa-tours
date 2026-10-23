import Image from "next/image";

import Reveal from "@/components/reveal";
import type { ItineraryDay } from "@/lib/packages";

// A vertical travel journal: a quiet line connects each day. Day images, when
// the package has them, sit inline so they work on touch devices too.
export default function ItineraryTimeline({ items }: { items: ItineraryDay[] }) {
  return (
    <ol>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className="relative pl-9 md:pl-14">
            {!isLast ? (
              <span
                aria-hidden
                className="absolute bottom-0 left-[0.4375rem] top-[1.375rem] w-px bg-border"
              />
            ) : null}
            <span
              aria-hidden
              className="absolute left-0 top-[0.4375rem] size-3.5 rounded-full border-2 border-primary bg-background"
            />

            <Reveal className={isLast ? "" : "pb-12 md:pb-14"}>
              {item.day ? <p className="eyebrow text-primary">{item.day}</p> : null}
              {item.title ? (
                <h3 className="text-title mt-2 text-balance text-foreground">{item.title}</h3>
              ) : null}
              {item.description ? (
                <p className="measure mt-3 text-muted-foreground md:text-lg">
                  {item.description}
                </p>
              ) : null}
              {item.image ? (
                <div className="relative mt-6 aspect-[16/9] w-full max-w-xl overflow-hidden rounded-2xl bg-secondary">
                  <Image
                    src={item.image}
                    alt={item.title || item.day}
                    fill
                    sizes="(min-width: 1024px) 36rem, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
