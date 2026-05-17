"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, ClipboardList } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EnquiryForm from "./enquiry-form";

export default function FloatingBookNow() {
  const [phoneExpanded, setPhoneExpanded] = useState(false);
  const [bookExpanded, setBookExpanded] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhoneExpanded(true), 1000);
    const t2 = setTimeout(() => setBookExpanded(true), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Desktop: side-by-side animated pills */}
      <div className="hidden md:flex items-center gap-3">

        {/* Call Now */}
        <a
          href={CONTACT.phones[0].href}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium ring-1 hover:shadow-sm overflow-hidden shadow-lg transition-colors duration-300 ${
            pastHero
              ? "bg-primary text-white ring-white/20"
              : "bg-white text-primary ring-primary/20"
          }`}
        >
          <motion.span
            animate={phoneExpanded ? { rotate: [0, -15, 15, -12, 12, -8, 8, 0] } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
            style={{ display: "inline-flex" }}
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
          </motion.span>
          <motion.span
            className="whitespace-nowrap overflow-hidden block"
            initial={{ maxWidth: 0, opacity: 0, marginLeft: 0 }}
            animate={{
              maxWidth: phoneExpanded ? "160px" : "0px",
              opacity: phoneExpanded ? 1 : 0,
              marginLeft: phoneExpanded ? "6px" : "0px",
            }}
            transition={{
              maxWidth: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, delay: 0.15 },
              marginLeft: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            Call Now
          </motion.span>
        </a>

        {/* Book Now */}
        <button
          onClick={() => setDialogOpen(true)}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium ring-1 hover:shadow-sm overflow-hidden shadow-lg transition-colors duration-300 ${
            pastHero
              ? "bg-white text-primary ring-primary/20"
              : "bg-primary text-white ring-white/20"
          }`}
        >
          <motion.span
            style={{ display: "inline-flex" }}
          >
            <ClipboardList className="h-3.5 w-3.5 shrink-0" />
          </motion.span>
          <motion.span
            className="whitespace-nowrap overflow-hidden block"
            initial={{ maxWidth: 0, opacity: 0, marginLeft: 0 }}
            animate={{
              maxWidth: bookExpanded ? "160px" : "0px",
              opacity: bookExpanded ? 1 : 0,
              marginLeft: bookExpanded ? "6px" : "0px",
            }}
            transition={{
              maxWidth: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.3, delay: 0.15 },
              marginLeft: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            Book Now
          </motion.span>
        </button>
      </div>

      {/* Mobile: stacked icon-only circular badges */}
      <div className="md:hidden flex flex-col gap-2 items-end">
        <a
          href={CONTACT.phones[0].href}
          className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg ring-1 transition-colors duration-300 ${
            pastHero
              ? "bg-primary text-white ring-white/20"
              : "bg-white text-primary ring-primary/20"
          }`}
        >
          <Phone className="h-4 w-4" />
        </a>
        <button
          onClick={() => setDialogOpen(true)}
          className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg ring-1 transition-colors duration-300 ${
            pastHero
              ? "bg-white text-primary ring-primary/20"
              : "bg-primary text-white ring-white/20"
          }`}
        >
          <ClipboardList className="h-4 w-4" />
        </button>
      </div>

      {/* Enquiry Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Enquiry</DialogTitle>
          </DialogHeader>
          <EnquiryForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
