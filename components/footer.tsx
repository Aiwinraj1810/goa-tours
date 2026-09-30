import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/cms";
import { CONTACT } from "@/lib/constants";

const SOCIAL_ICON_MAP: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

function resolveSocialIcon(label: string) {
  return SOCIAL_ICON_MAP[label.trim().toLowerCase()] ?? Mail;
}

export default async function Footer() {
  const settings = await getSiteSettings();

  const footerText =
    settings?.footerText ||
    "Discover the soul of India — from sun-kissed beaches to hidden waterfalls, vibrant culture, and unforgettable experiences.";
  const footerColumns = settings?.footerColumns ?? [];
  const socialLinks = settings?.socialLinks ?? [];
  const newsletterHeading = settings?.newsletterHeading || "Adventure never takes a season off";
  const newsletterSubheading =
    settings?.newsletterSubheading ||
    "Subscribe to our newsletter to find travel inspiration in your inbox.";
  const address = settings?.address || CONTACT.address;
  const phones = settings?.phones && settings.phones.length > 0
    ? settings.phones
    : CONTACT.phones.map((p) => p.value);
  const email = settings?.email || CONTACT.email;

  return (
    <footer className="bg-navy text-navy-foreground">
      {/* --- Newsletter strip --- */}
      <div
        className="relative bg-cover bg-center py-16"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dur23cis9/image/upload/v1761149876/pexels-asadphoto-457882_11zon_c6cjij.webp')",
        }}
      >
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative mx-auto max-w-2xl px-5 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">{newsletterHeading}</h2>
          <p className="mt-2 text-sm text-navy-foreground/70">{newsletterSubheading}</p>
          <form className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-full border border-navy-foreground/20 bg-navy-foreground/10 px-4 py-2.5 text-sm text-navy-foreground placeholder:text-navy-foreground/50 focus:outline-none"
            />
            <Button type="submit" className="shrink-0 rounded-full bg-accent text-accent-foreground hover:opacity-90">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* --- Link columns --- */}
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-xl font-bold">Real Goa Holidays</h3>
            <p className="text-sm text-navy-foreground/70 leading-relaxed">{footerText}</p>
            {socialLinks.length > 0 ? (
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => {
                  const Icon = resolveSocialIcon(social.label);
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-full bg-navy-foreground/10 hover:bg-navy-foreground/20"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>

          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h4 className="mb-3 font-semibold">{column.heading}</h4>
              <nav className="flex flex-col gap-2 text-sm text-navy-foreground/70">
                {column.links.map((link) => (
                  <Link key={link.label} href={link.href} className="hover:text-navy-foreground">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          <div className="space-y-2">
            <h4 className="mb-3 font-semibold">Contact Us</h4>
            <p className="flex items-start gap-2 text-sm text-navy-foreground/70">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {address}
            </p>
            {phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-sm text-navy-foreground/70 hover:text-navy-foreground"
              >
                <Phone className="size-4" />
                {phone}
              </a>
            ))}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-navy-foreground/70 hover:text-navy-foreground"
              >
                <Mail className="size-4" />
                {email}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* --- Bottom bar --- */}
      <div className="border-t border-navy-foreground/10 py-4 text-center text-sm text-navy-foreground/60">
        © {new Date().getFullYear()} Real Goa Holidays. All rights reserved.
      </div>
    </footer>
  );
}
