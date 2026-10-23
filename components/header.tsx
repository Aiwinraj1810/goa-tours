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

const DESTINATION_SWITCH = [
  { slug: "goa", label: "Goa" },
  { slug: "kerala", label: "Kerala" },
];

// Pages that exist for both destinations, so switching keeps you on the same page.
// Everything else (about, contact, package details, thank-you, per-destination
// CMS pages) is intentionally excluded: the content there is not interchangeable.
const SWITCHABLE = /^([/]|[/](goa|kerala)([/](packages|gallery))?[/]?)$/;

function switchHref(pathname: string, target: string) {
  if (pathname === "/" || /^[/](goa|kerala)[/]?$/.test(pathname)) {
    return target === "goa" ? "/" : `/${target}`;
  }
  return pathname.replace(/^[/](goa|kerala)/, `/${target}`);
}

function DestinationSwitcher({
  pathname,
  active,
  className,
}: {
  pathname: string;
  active: string;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Choose destination"
      className={cn("flex items-center gap-4 text-sm font-medium md:gap-5", className)}
    >
      {DESTINATION_SWITCH.map((d) => {
        const selected = d.slug === active;
        return (
          <Link
            key={d.slug}
            href={switchHref(pathname, d.slug)}
            role="tab"
            aria-selected={selected}
            className={cn(
              "border-b-2 pb-0.5 transition-opacity",
              selected
                ? "border-current opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            {d.label}
          </Link>
        );
      })}
    </div>
  );
}

export default function Header() {
  const [compact, setCompact] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const destinationMatch = pathname.match(/^\/(goa|kerala)/);
  const destination = destinationMatch ? destinationMatch[1] : null;

  const isPackageDetail = /^\/(goa|kerala)\/packages\/.+/.test(pathname);

  const navLinks = destination
    ? [
        { name: "Home", href: `/${destination}` },
        { name: "Packages", href: `/${destination}/packages` },
        { name: "Gallery", href: `/${destination}/gallery` },
        { name: "About", href: "/about" },
      ]
    : [
        { name: "Home", href: "/" },
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

  const showSwitcher = SWITCHABLE.test(pathname);
  const activeDestination = destination ?? "goa";

  const isHome =
    pathname === "/" ||
    pathname === "/thank-you" ||
    pathname === "/goa" ||
    pathname === "/kerala";

  return (
    <header
      className={cn(
        "gutter fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ease-in-out",
        visible ? "translate-y-0" : "-translate-y-full",
        isHome && !compact
          ? "bg-transparent py-3 md:py-5"
          : "border-b border-border bg-background/95 py-1.5 backdrop-blur md:py-2"
      )}
    >
      <div className="relative flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <Link
            href={destination ? `/${destination}` : "/"}
            className={cn(
              "relative cursor-pointer transition-all duration-300",
              compact ? "h-14 w-14 md:h-16 md:w-16" : "h-16 w-16 md:h-24 md:w-24"
            )}
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
            href={destination ? `/${destination}` : "/"}
            className={cn(
              "font-semibold hidden md:block text-balance transition-all tracking-tight",
              compact ? "text-lg" : "text-2xl"
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

        {showSwitcher ? (
          <DestinationSwitcher
            pathname={pathname}
            active={activeDestination}
            className={cn(
              "hidden md:flex md:ml-auto md:mr-8 md:border-r md:border-current/25 md:pr-8",
              isHome && !compact ? "text-white" : "text-foreground"
            )}
          />
        ) : null}

        <nav className="hidden md:flex gap-8 items-center text-sm">
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

          <Link href={destination ? `/${destination}/contact` : "/about"}>
            <Button
              className={cn(
                "cursor-pointer rounded-full",
                isHome && !compact
                  ? "bg-white text-black hover:bg-white/85"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              )}
            >
              Enquire
            </Button>
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          {showSwitcher ? (
            <DestinationSwitcher
              pathname={pathname}
              active={activeDestination}
              className={isHome && !compact ? "text-white" : "text-foreground"}
            />
          ) : null}
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
              className="w-[80%] sm:w-[60%] bg-background p-6"
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
