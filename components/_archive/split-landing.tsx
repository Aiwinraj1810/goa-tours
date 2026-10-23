"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/lib/destinations";

const panels = [
  {
    slug: "goa",
    label: "Goa",
    tagline: "Sun, Sand & Serenity",
    cover: destinations.goa.coverImage,
    accent: "#fb923c",
  },
  {
    slug: "kerala",
    label: "Kerala",
    tagline: "God's Own Country",
    cover: destinations.kerala.coverImage,
    accent: "#22c55e",
  },
];

export default function SplitLandingPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {panels.map((panel) => {
        const isHovered = hovered === panel.slug;
        const isOtherHovered = hovered !== null && hovered !== panel.slug;

        return (
          <motion.div
            key={panel.slug}
            className="relative flex-1 overflow-hidden cursor-pointer"
            animate={{
              flex: isHovered ? 1.35 : isOtherHovered ? 0.65 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onMouseEnter={() => setHovered(panel.slug)}
            onMouseLeave={() => setHovered(null)}
          >
            <Link href={`/${panel.slug}`} className="block h-full w-full">
              {/* Background image */}
              <motion.div
                className="absolute inset-0"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <Image
                  src={panel.cover}
                  alt={panel.label}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Dark overlay */}
              <motion.div
                className="absolute inset-0 bg-black"
                animate={{ opacity: isHovered ? 0.35 : 0.55 }}
                transition={{ duration: 0.4 }}
              />

              {/* Vertical divider line (only between panels, hidden on mobile) */}
              {panel.slug === "goa" && (
                <div className="absolute right-0 top-0 h-full w-px bg-white/20 z-10 hidden md:block" />
              )}

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-8 text-center">
                <motion.p
                  className="text-xs uppercase tracking-[0.25em] text-white/60 mb-3"
                  animate={{ opacity: isHovered ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  Explore
                </motion.p>

                <motion.h2
                  className="text-5xl md:text-7xl font-bold leading-none mb-3"
                  animate={{ y: isHovered ? -4 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {panel.label}
                </motion.h2>

                <motion.p
                  className="text-sm md:text-base text-white/70 tracking-wide"
                  animate={{ opacity: isHovered ? 1 : 0.6 }}
                  transition={{ duration: 0.3 }}
                >
                  {panel.tagline}
                </motion.p>

                <motion.div
                  className="mt-8 flex items-center gap-2 text-sm font-medium"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: panel.accent }}
                >
                  Discover {panel.label}
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </Link>
          </motion.div>
        );
      })}

      {/* Branding overlay at top */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-white text-center pointer-events-none">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
          Real Goa Holidays
        </p>
      </div>
    </div>
  );
}
