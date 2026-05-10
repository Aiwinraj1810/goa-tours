"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function ScrollToFormButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const form = document.getElementById("enquiry-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg text-sm font-medium"
    >
      Send an Enquiry
      <ArrowDown className="w-4 h-4" />
    </button>
  );
}
