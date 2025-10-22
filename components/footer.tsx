import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-secondary/40 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
        {/* --- Brand Info --- */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-primary">Real Goa Holidays</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Discover the soul of Goa — from sun-kissed beaches to hidden
            waterfalls, vibrant culture, and unforgettable experiences. Crafted
            with love by locals.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <Link className="hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <Link
              className="hover:text-primary transition-colors"
              href="/gallery"
            >
              Gallery
            </Link>
            <Link
              className="hover:text-primary transition-colors"
              href="/about"
            >
              About
            </Link>
            <Link
              className="hover:text-primary transition-colors"
              href="/contact"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* --- Contact Info --- */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Contact Us</h4>
          <p className="text-sm text-muted-foreground">
            Calangute, North Goa, India
            <br />
            <a
              href="mailto:info@realgoaholidays.com"
              className="text-primary hover:underline block mt-1"
            >
              info@realgoaholidays.com
            </a>
            <a
              href="tel:+919876543210"
              className="text-primary hover:underline block mt-1"
            >
              +91 98765 43210
            </a>
          </p>
        </div>

        {/* --- Map --- */}
        <div className="overflow-hidden rounded-xl shadow-md h-[200px] md:h-[250px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.4682662142495!2d73.76941717489179!3d15.513008085088781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc139e1855d07%3A0xc5bcc81c6406d534!2sReal%20Goa%20Holidays!5e0!3m2!1sen!2sin!4v1761147743934!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0 w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-border mt-8 py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Real Goa Holidays. All rights reserved.
      </div>
    </footer>
  );
}
