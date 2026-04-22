"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const isPackageDetail = /^\/packages\/.+/.test(pathname);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/packages" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    const bannerThreshold = window.innerHeight * 0.6;

    lastScrollY.current = window.scrollY;
    setCompact(window.scrollY > 12);
    // Hide on page load if on detail page and at the top
    setVisible(isPackageDetail ? window.scrollY >= bannerThreshold : true);

    const onScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;
        const absDelta = Math.abs(delta);

        setCompact(currentScrollY > 12);

        if (isPackageDetail && currentScrollY < bannerThreshold) {
          setVisible(false);
          lastScrollY.current = currentScrollY;
        } else if (currentScrollY < 10) {
          setVisible(true);
          lastScrollY.current = currentScrollY;
        } else if (absDelta >= 5) {
          if (delta > 0 && currentScrollY > 80) {
            setVisible(false);
          } else if (delta < 0) {
            setVisible(true);
          }

          lastScrollY.current = currentScrollY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, isPackageDetail]);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 transform transition-all duration-300 ease-in-out",
        visible ? "translate-y-0" : "-translate-y-full",
        !isHome &&
          "bg-gradient-to-l from-[#f9f5e9] via-[#ddf6fb] to-[#ddf6fb]",
        compact
          ? "bg-gradient-to-l from-[#f9f5e9] via-[#ddf6fb] to-[#ddf6fb] py-2 px-6 rounded-b-xl shadow-none"
          : "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 px-6 rounded-xl mt-3 shadow-md"
      )}
    >
      <div className="flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="relative md:h-20 md:w-20 h-24 w-24 cursor-pointer"
          >
            <Image
              src={"/images/logo.png"}
              alt="Real Goa Holidays logo"
              fill
              className="object-cover h-full w-full"
              priority
            />
          </Link>

          <Link
            href="/"
            className={cn(
              "font-semibold hidden md:block text-balance transition-all tracking-tight",
              compact ? "text-lg" : "text-2xl"
            )}
          >
            <span className="text-primary">Real Goa</span>{" "}
            <span
              className={
                isHome ? (compact ? "text-black" : "text-white") : "text-black"
              }
            >
              Holidays
            </span>
          </Link>
        </div>

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
