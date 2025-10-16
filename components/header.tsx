"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
        "w-full z-50 transition-all",
        compact
          ? "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 top-3 max-w-7xl mx-auto px-6 rounded-xl sticky shadow-md"
          : "py-4 px-4 sticky bg-[#ddf6fb] w-full top-0"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between transition-all">
        {/* --- Logo --- */}
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 sm:h-16 sm:w-16">
            <Image
              src={"/images/logo.png"}
              alt={"logo"}
              fill
              className="object-cover h-full w-full"
            />
          </div>
          <Link
            href="/"
            className={cn(
              "font-semibold hidden md:block text-balance transition-all tracking-tight",
              compact ? "text-lg" : "text-2xl"
            )}
          >
            <span className="text-primary">Real Goa</span> Holidays
          </Link>
        </div>

        {/* --- Desktop Nav --- */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link className="hover:text-primary transition-colors" href="/gallery">
            Gallery
          </Link>
          <Link className="hover:text-primary transition-colors" href="/about">
            About
          </Link>
          <Link className="hover:text-primary transition-colors" href="/contact">
            Contact
          </Link>

          <Link href="/contact">
            <Button className="bg-primary text-primary-foreground hover:opacity-90 cursor-pointer">
              Enquire
            </Button>
          </Link>
        </nav>

        {/* --- Mobile Menu --- */}
        <div className="md:hidden flex items-center">
          <Sheet >
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="p-2 rounded-md hover:bg-primary/10 transition"
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[60%] bg-white p-6">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold mb-4">
                  Menu
                </SheetTitle>
              </SheetHeader>

              {/* --- Mobile Nav Links --- */}
              <div className="flex flex-col gap-6 mt-4 text-lg">
                <SheetClose asChild>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/gallery" className="hover:text-primary transition-colors">
                    Gallery
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </SheetClose>
              </div>

              {/* --- Enquire Button --- */}
              <div className="mt-8">
                <SheetClose asChild>
                  <Link href="/contact">
                    <Button className="w-full bg-primary text-primary-foreground hover:opacity-90">
                      Enquire
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
