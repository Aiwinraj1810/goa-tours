"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = {
  name: string;
  title?: string;
  avatar?: string;
  text: string;
};

type Props = {
  heading: string;
  testimonials: Testimonial[];
};

const ease = [0.22, 1, 0.36, 1] as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// One voice at a time, set large. No autoplay: visitors read at their own pace.
export default function TestimonialsQuote({ heading, testimonials }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = testimonials.length;
  const t = testimonials[index];

  function go(dir: 1 | -1) {
    setDirection(dir);
    setIndex((i) => (i + dir + total) % total);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={heading}
      className="section-y bg-navy text-navy-foreground"
    >
      <div className="gutter wide grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 className="eyebrow text-navy-foreground/70">{heading}</h2>
          {total > 1 ? (
            <p className="mt-6 hidden text-sm tabular-nums text-navy-foreground/60 lg:block">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          ) : null}
        </div>

        <div className="lg:col-span-9">
          <motion.div
            drag={total > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            className="touch-pan-y"
          >
            <div aria-live="polite" className="min-h-[18rem]">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.figure
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: 40 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 * direction }}
                  transition={{ duration: 0.5, ease }}
                  role="group"
                  aria-label={`Testimonial ${index + 1} of ${total}`}
                >
                  <blockquote className="max-w-4xl text-[clamp(1.5rem,3.4vw,3rem)] font-medium leading-[1.2] tracking-tight text-balance">
                    <span aria-hidden className="mr-1 text-navy-foreground/40">
                      “
                    </span>
                    {t.text}
                    <span aria-hidden className="ml-0.5 text-navy-foreground/40">
                      ”
                    </span>
                  </blockquote>

                  <figcaption className="mt-10 flex items-center gap-4">
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt=""
                        width={44}
                        height={44}
                        className="size-11 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-11 items-center justify-center rounded-full bg-navy-foreground/10 text-sm font-semibold">
                        {getInitials(t.name)}
                      </span>
                    )}
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      {t.title ? (
                        <span className="block text-sm text-navy-foreground/60">{t.title}</span>
                      ) : null}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </motion.div>

          {total > 1 ? (
            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                className="flex size-11 items-center justify-center rounded-full border border-navy-foreground/30 transition-colors hover:bg-navy-foreground hover:text-navy"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                className="flex size-11 items-center justify-center rounded-full border border-navy-foreground/30 transition-colors hover:bg-navy-foreground hover:text-navy"
              >
                <ArrowRight className="size-4" />
              </button>
              <span className="ml-3 text-sm tabular-nums text-navy-foreground/60 lg:hidden">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
