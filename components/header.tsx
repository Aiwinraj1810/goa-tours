"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // 👈 Import this
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
  const pathname = usePathname(); // 👈 detect current route

  // ✅ Nav links array
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Compact header toggle
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

  // 👇 Determine header position style based on route
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        // Position logic
        isHome
          ? "fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl z-50"
          : "sticky top-0 z-50 max-w-7xl mx-auto bg-gradient-to-l from-[#f9f5e9] via-[#ddf6fb] to-[#ddf6fb]",

        // Transitions and base style
        "transition-all duration-300 ease-in-out",
        compact
          ? "bg-gradient-to-l from-[#f9f5e9] via-[#ddf6fb] to-[#ddf6fb] py-2 px-6 rounded-xl mt-3 shadow-none"
          : "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 px-6 rounded-xl mt-3 shadow-md"
      )}
    >
      <div className="flex items-center justify-between transition-all">
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
            <span className="text-primary">Real Goa</span>{" "}
            <span className={isHome ? compact ? "text-black" : "text-white" : "text-black"}>
              Holidays
            </span>
          </Link>
        </div>

        {/* --- Desktop Nav --- */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks
            .filter((item) => item.name !== "Home")
            .map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "hover:text-primary transition-colors",
                  isHome
                    ? compact
                      ? "text-black"
                      : "text-white"
                    : "text-black"
                )}
              >
                {link.name}
              </Link>
            ))}

          <Link href="/contact">
            <Button className="bg-primary text-primary-foreground hover:opacity-90 cursor-pointer">
              Enquire
            </Button>
          </Link>
        </nav>

        {/* --- Mobile Menu --- */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="p-2 rounded-md hover:bg-primary/10 transition"
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80%] sm:w-[60%] bg-white p-6"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold mb-4">
                  Menu
                </SheetTitle>
              </SheetHeader>

              {/* --- Mobile Nav --- */}
              <div className="flex flex-col gap-6 mt-4 text-lg">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
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
