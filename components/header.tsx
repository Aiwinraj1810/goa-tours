"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setCompact(window.scrollY > 12)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-all",
        compact ? "bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2" : "py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between transition-all">
        <Link href="/" className={cn("font-semibold text-balance transition-all tracking-tight", compact ? "text-lg" : "text-2xl")}>
          <span className="text-primary">Real Goa</span> Holidays
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link className="hover:text-primary transition-colors" href="/gallery">
            Gallery
          </Link>
          <Link className="hover:text-primary transition-colors" href="/about">
            About
          </Link>
          <Link className="hover:text-primary transition-colors" href="/contact">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/contact">
            <Button variant="default" className="bg-primary text-primary-foreground hover:opacity-90">
              Enquire
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
