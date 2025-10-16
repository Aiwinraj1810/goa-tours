"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EnquiryForm from "./enquiry-form";

export default function FloatingBookNow() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* --- Floating Button --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-accent text-accent-foreground shadow-lg hover:opacity-90">
            Book Now
          </Button>
        </DialogTrigger>

        {/* --- Dialog Content --- */}
        <DialogContent className="max-w-2xl p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Enquiry</DialogTitle>
          </DialogHeader>

          {/* --- Enquiry Form --- */}
          <EnquiryForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
