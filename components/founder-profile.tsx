import Image from "next/image";

import Reveal from "@/components/reveal";
import { hasPhoto } from "@/lib/utils";

type Props = {
  eyebrow: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: string[];
};

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => /^\p{L}/u.test(word))
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function FounderProfile({ eyebrow, name, role, image, imageAlt, bio }: Props) {
  const photo = hasPhoto(image);
  const paragraphs = bio.filter(Boolean);

  return (
    <section className="pb-[clamp(4.5rem,9vw,9rem)]">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-0">
        {/* Portrait bleeds to the left edge */}
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] max-h-[72svh] w-full overflow-hidden bg-navy lg:max-h-none lg:rounded-r-[2.5rem]">
            {photo ? (
              <Image
                src={image}
                alt={imageAlt || [name, role].filter(Boolean).join(" — ")}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            ) : (
              // No photograph supplied yet: initials from the name, set large.
              <div aria-hidden className="absolute inset-0 flex items-end p-[var(--gutter)]">
                <span className="select-none text-[clamp(7rem,20vw,15rem)] font-semibold leading-[0.8] tracking-tighter text-navy-foreground/15">
                  {initialsOf(name)}
                </span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="gutter lg:col-span-6 lg:col-start-7 lg:pl-4 xl:pl-10">
          {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
          {name ? (
            <h2 className="text-headline mt-4 text-balance text-foreground">{name}</h2>
          ) : null}
          {role ? <p className="mt-4 text-lg font-medium text-primary">{role}</p> : null}
          {paragraphs.length > 0 ? (
            <>
              <div aria-hidden className="my-8 h-px w-16 bg-foreground/25" />
              <div className="measure space-y-5 text-lg leading-[1.7] text-muted-foreground">
                {paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "text-xl leading-[1.6] text-foreground/85" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
