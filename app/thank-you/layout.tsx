import type { Metadata } from "next";

// The confirmation page after an enquiry has no value in search results.
export const metadata: Metadata = {
  title: "Thank you | Real Goa Holidays",
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
