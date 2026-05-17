"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative py-32 md:pt-48 min-h-screen w-full overflow-hidden flex items-center justify-center">

      {/* Background image */}
      <Image
        src="/images/hero.jpg"
        alt="Goa"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto"
      >
        {/* Check icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={show ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-white/70 text-sm font-medium uppercase tracking-[0.2em] mb-3"
        >
          Enquiry Received
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          Goa is waiting
          <br />
          <span className="text-[#fb923c]">for you.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-white/75 text-base md:text-lg leading-relaxed mb-10"
        >
          Thank you for reaching out. Our team will review your enquiry and
          get back to you within <span className="text-white font-medium">24 hours</span>.
          Until then — explore what's waiting for you.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <Link href="/gallery">
            <Button className="bg-[#fb923c] hover:bg-[#f97316] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg gap-2 cursor-pointer">
              <Images className="w-5 h-5" />
              Glance Gallery
            </Button>
          </Link>
        </motion.div>

        {/* Logo watermark */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Image
            src="/images/logo.png"
            alt="Real Goa Holidays"
            width={56}
            height={56}
            className="object-contain opacity-70 mx-auto"
          />
          <p className="text-white/40 text-xs mt-2 tracking-wide">Real Goa Holidays</p>
        </motion.div> */}
      </motion.div>

    </div>
  );
}
