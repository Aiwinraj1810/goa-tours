import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Poppins, Bricolage_Grotesque } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { QueryProvider } from "@/components/providers/query-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Goa Tours | Sun, Sand & Serenity",
  description:
    "Premium Goa travel and tour services. Discover beaches, forts, waterfalls, local cuisine, and sunset cruises.",
  keywords: ["Goa Tourism", "Best Goa Travel Packages", "Goa Tours", "Sunset Cruises Goa", "Goa Beaches"],
  openGraph: {
    title: "Goa Tours | Sun, Sand & Serenity",
    description: "Discover the Soul of Goa — Sun, Sand & Serenity",
    images: ["/images/hero.jpg"],
    url: "https://example.com",
    type: "website",
  },
  generator: "v0.app",
}

// 🩵 Poppins: main display font
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
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </Suspense>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
