"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SectionNavItem } from "@/lib/section-nav";

// Space left above a section after jumping to it, so the fixed header does not cover it.
const HEADER_OFFSET = 72;

export default function SectionMenu({ items }: { items: SectionNavItem[] }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [available, setAvailable] = useState<SectionNavItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Blocks with no content render nothing, so only offer sections that exist on screen.
  const measure = useCallback(() => {
    setAvailable(
      items.filter((item) => {
        const el = document.getElementById(item.id);
        return !!el && el.offsetHeight > 0;
      })
    );
  }, [items]);

  useEffect(() => {
    measure();
    const t = setTimeout(measure, 800);
    return () => clearTimeout(t);
  }, [measure]);

  useEffect(() => {
    const onScroll = () => {
      // Same rule as the Call / Book buttons: appear once the visitor moves past the hero.
      setShown(window.scrollY > window.innerHeight * 0.6);

      const probe = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.offsetHeight > 0 && el.getBoundingClientRect().top <= probe) {
          current = item.id;
        }
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  // Close on outside click and Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function jumpTo(id: string) {
    const el = document.getElementById(id);
    setOpen(false);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  if (items.length === 0) return null;

  return (
    <div
      ref={rootRef}
      // Sits just above the Call / Book buttons in the bottom-right corner.
      className={cn(
        "fixed bottom-[8.25rem] right-5 z-40 transition-all duration-500 md:bottom-[4.75rem] md:right-6",
        shown || open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="section-menu-panel"
            aria-label="Homepage sections"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-3 w-64 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
          >
            <p className="eyebrow border-b border-border px-5 py-3 text-muted-foreground">
              On this page
            </p>
            <ul className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain py-1">
              {available.map((item, i) => {
                const active = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(item.id)}
                      aria-current={active ? "location" : undefined}
                      className={cn(
                        "flex min-h-11 w-full items-baseline gap-4 px-5 py-2.5 text-left text-sm transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
                        active ? "font-semibold text-primary" : "text-foreground"
                      )}
                    >
                      <span className="w-5 shrink-0 text-xs tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-balance">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-label={open ? "Close section menu" : "Jump to a section"}
        aria-expanded={open}
        aria-controls="section-menu-panel"
        onClick={() => {
          if (!open) measure();
          setOpen((v) => !v);
        }}
        className="flex size-11 items-center justify-center rounded-lg bg-navy text-navy-foreground shadow-lg ring-1 ring-white/15 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {open ? <X className="size-5" /> : <List className="size-5" />}
      </button>
    </div>
  );
}
