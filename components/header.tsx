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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/packages" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setCompact(window.scrollY > 12);
    setVisible(true);

    const onScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;
        const absDelta = Math.abs(delta);

        setCompact(currentScrollY > 12);

        if (currentScrollY < 10) {
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
  }, [pathname]);

  const isHome = pathname === "/" || pathname === "/thank-you";

  return (
    <header
      className={cn(
        "fixed top-0 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 transform transition-all duration-300 ease-in-out",
        visible ? "translate-y-0" : "-translate-y-full",
        !isHome &&
          "bg-gradient-to-l from-[#f9f5e9] via-[#ddf6fb] to-[#ddf6fb]",
        compact
          ? "bg-gradient-to-l from-[#f9f5e9] via-[#ddf6fb] to-[#ddf6fb] py-2 px-3 md:px-6 rounded-b-xl shadow-none"
          : "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 px-3 md:px-6 rounded-xl mt-3 shadow-md"
      )}
    >
      <div className="relative flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="relative md:h-32 md:w-32 h-24 w-24 cursor-pointer"
          >
            <Image
              src={"https://res.cloudinary.com/dur23cis9/image/upload/v1778997401/samples/Goa-tours/logo_qxdtsd.png"}
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
              compact ? "text-xl" : "text-3xl"
            )}
          >
            <span
              className={
                isHome ? (compact ? "text-primary" : "text-white") : "text-primary"
              }
            >
              Real Goa
            </span>{" "}
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
            .map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "transition-colors relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:transition-opacity",
                    isHome
                      ? compact
                        ? "text-black hover:text-primary after:bg-primary"
                        : "text-white hover:text-white/80 after:bg-white"
                      : "text-black hover:text-primary after:bg-primary",
                    isActive ? "font-medium after:opacity-100" : "after:opacity-0"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

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
                <Menu className={cn("h-6 w-6", isHome && !compact ? "text-white" : "text-foreground")} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80%] sm:w-[60%] bg-gradient-to-l from-[#f9f5e9] via-[#ddf6fb] to-[#ddf6fb] p-6"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold mb-4 text-black">
                  
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col mt-4 text-lg divide-y divide-black/15">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      className="text-black hover:text-primary transition-colors py-4"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <div className="mt-6">
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
