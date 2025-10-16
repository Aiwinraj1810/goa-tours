"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Header() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setCompact(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        " w-full z-50  transition-all",
        compact
          ? "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 top-3 max-w-7xl mx-auto px-10 rounded-xl sticky shadow-md"
          : "py-4 sticky bg-[#ddf6fb] w-full top-0"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16">
            <Image
              src={"/images/logo.png"}
              alt={"logo"}
              fill
              className="object-cover h-full w-full"
              // sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <Link
            href="/"
            className={cn(
              "font-semibold hidden md:block text-balance transition-all tracking-tight",
              compact ? "text-lg" : "text-2xl"
            )}
          >
            <span className="text-primary">Real Goa</span> {" "} Holidays
          </Link>
          
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link
            className="hover:text-primary transition-colors"
            href="/gallery"
          >
            Gallery
          </Link>
          <Link className="hover:text-primary transition-colors" href="/about">
            About
          </Link>
          <Link
            className="hover:text-primary transition-colors"
            href="/contact"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contact">
            <Button
              variant="default"
              className="bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
            >
              Enquire
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
