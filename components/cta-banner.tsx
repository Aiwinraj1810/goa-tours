import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="relative bg-[url('https://res.cloudinary.com/dur23cis9/image/upload/v1760684111/pexels-rohit-sharma-1230131-23322244_xyzvj8.jpg')] bg-cover bg-center py-40 mt-16">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative mx-auto max-w-5xl px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Ready to Experience <span className="text-primary">Real Goa</span>?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Let us craft the perfect getaway for you from sun-kissed beaches to
          heritage adventures.
        </p>
        <Link href="/contact">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:opacity-90 shadow-lg transition-all"
          >
            Plan Your Trip
          </Button>
        </Link>
      </div>
    </section>
  );
}
