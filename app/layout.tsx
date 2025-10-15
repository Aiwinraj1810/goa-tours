import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
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
