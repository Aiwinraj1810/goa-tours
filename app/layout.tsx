import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Bricolage_Grotesque } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { QueryProvider } from "@/components/providers/query-provider"
import { MotionProvider } from "@/components/providers/motion-provider"
import { Toaster } from "@/components/ui/toaster"
import "keen-slider/keen-slider.min.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Pages and the footer read the CMS at request time. Without this, Next.js would
// bake that content in at build time and CMS edits would not appear until the
// next deploy (there is no revalidation hook between the CMS and this site).
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Real Goa Holidays | Sun, Sand & Serenity",
  description:
    "Premium Goa travel and tour services. Discover beaches, forts, waterfalls, local cuisine, and sunset cruises.",
  keywords: ["Goa Tourism", "Best Goa Travel Packages", "Real Goa Holidays", "Sunset Cruises Goa", "Goa Beaches"],
  openGraph: {
    title: "Real Goa Holidays | Sun, Sand & Serenity",
    description: "Discover the Soul of Goa — Sun, Sand & Serenity",
    images: ["/images/hero.jpg"],
    siteName: SITE_NAME,
    type: "website",
  },
  // Title, description and image fall back to each page's own Open Graph values.
  twitter: { card: "summary_large_image" },
}

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en"  className={bricolage.variable}>
      <body
       className="font-sans"
      >
        <QueryProvider>
          <MotionProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </MotionProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
