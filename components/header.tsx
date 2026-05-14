"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
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
  const [phoneExpanded, setPhoneExpanded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPhoneExpanded(true), 1000);
    return () => clearTimeout(t);
  }, []);
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

        {/* Mobile-only centered pill */}
        <a
          href={CONTACT.phones[0].href}
          className="md:hidden flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white text-primary ring-1 ring-primary/20 hover:shadow-sm overflow-hidden"
        >
          <motion.span
            animate={phoneExpanded ? { rotate: [0, -15, 15, -12, 12, -8, 8, 0] } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
            style={{ display: "inline-flex" }}
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
          </motion.span>
          <motion.span
            className="whitespace-nowrap overflow-hidden block"
            initial={{ maxWidth: 0, opacity: 0, marginLeft: 0 }}
            animate={{
              maxWidth: phoneExpanded ? "160px" : "0px",
              opacity: phoneExpanded ? 1 : 0,
              marginLeft: phoneExpanded ? "6px" : "0px",
            }}
            transition={{
              maxWidth: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, delay: 0.15 },
              marginLeft: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            {CONTACT.phones[0].value}
          </motion.span>
        </a>

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

          <a
            href={CONTACT.phones[0].href}
            className="flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white text-primary ring-1 ring-primary/20 hover:shadow-sm overflow-hidden"
          >
            <motion.span
              animate={phoneExpanded ? { rotate: [0, -15, 15, -12, 12, -8, 8, 0] } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
              style={{ display: "inline-flex" }}
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
            </motion.span>
            <motion.span
              className="whitespace-nowrap overflow-hidden block"
              initial={{ maxWidth: 0, opacity: 0, marginLeft: 0 }}
              animate={{
                maxWidth: phoneExpanded ? "160px" : "0px",
                opacity: phoneExpanded ? 1 : 0,
                marginLeft: phoneExpanded ? "6px" : "0px",
              }}
              transition={{
                maxWidth: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.3, delay: 0.15 },
                marginLeft: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              {CONTACT.phones[0].value}
            </motion.span>
          </a>

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
                <a
                  href={CONTACT.phones[0].href}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium ring-1 ring-primary/40 text-primary w-fit hover:bg-primary/10 transition-all"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.phones[0].value}
                </a>
              </div>

              <div className="mt-4">
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
