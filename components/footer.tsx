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
      {/* Newsletter */}
      <div className="gutter wide grid gap-8 border-b border-navy-foreground/15 py-[clamp(3.5rem,7vw,6rem)] lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="text-headline max-w-2xl text-balance">{newsletterHeading}</h2>
          <p className="measure mt-4 text-navy-foreground/70">{newsletterSubheading}</p>
        </div>
        <form className="flex items-end gap-4 lg:col-span-5">
          <label className="sr-only" htmlFor="footer-email">
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            placeholder="Enter your email"
            className="w-full border-0 border-b border-navy-foreground/40 bg-transparent py-3 text-base text-navy-foreground placeholder:text-navy-foreground/50 focus:border-navy-foreground focus:outline-none"
          />
          <Button
            type="submit"
            className="h-11 shrink-0 rounded-full bg-navy-foreground px-6 text-navy hover:opacity-90"
          >
            Subscribe
          </Button>
        </form>
      </div>

      {/* Brand, links, contact */}
      <div className="gutter wide grid grid-cols-2 gap-x-6 gap-y-12 py-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="col-span-2 space-y-4 lg:col-span-4">
          <h3 className="text-title">Real Goa Holidays</h3>
          <p className="measure text-sm leading-relaxed text-navy-foreground/70">{footerText}</p>
          {socialLinks.length > 0 ? (
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = resolveSocialIcon(social.label);
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-navy-foreground/25 transition-colors hover:bg-navy-foreground hover:text-navy"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading} className="lg:col-span-2">
            <h4 className="eyebrow mb-5 text-navy-foreground/60">{column.heading}</h4>
            <nav className="flex flex-col gap-3 text-sm text-navy-foreground/80">
              {column.links.map((link) => (
                <Link key={link.label} href={link.href} className="transition-colors hover:text-navy-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ))}

        <div className="col-span-2 space-y-3 lg:col-span-3 lg:col-start-10">
          <h4 className="eyebrow mb-5 text-navy-foreground/60">Contact Us</h4>
          <p className="flex items-start gap-3 text-sm text-navy-foreground/80">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {address}
          </p>
          {phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone}`}
              className="flex items-center gap-3 text-sm text-navy-foreground/80 transition-colors hover:text-navy-foreground"
            >
              <Phone className="size-4" />
              {phone}
            </a>
          ))}
          {email ? (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-sm text-navy-foreground/80 transition-colors hover:text-navy-foreground"
            >
              <Mail className="size-4" />
              {email}
            </a>
          ) : null}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="gutter wide border-t border-navy-foreground/15 py-6 text-sm text-navy-foreground/60">
        © {new Date().getFullYear()} Real Goa Holidays. All rights reserved.
      </div>
    </footer>
  );
}
