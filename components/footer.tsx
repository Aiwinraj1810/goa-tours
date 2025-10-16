import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold mb-2">Real Goa Holidays</h3>
          <p className="text-sm text-muted-foreground text-pretty">
            Premium local experiences across beaches, forts, waterfalls, churches, and nightlife.
          </p>
        </div>
        <nav className="flex flex-col gap-2">
          <Link className="hover:text-primary" href="/">
            Home
          </Link>
          <Link className="hover:text-primary" href="/gallery">
            Gallery
          </Link>
          <Link className="hover:text-primary" href="/about">
            About
          </Link>
          <Link className="hover:text-primary" href="/contact">
            Contact
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Real Goa Holidays. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
