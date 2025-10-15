"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import EnquiryForm from "./enquiry-form"
import { X } from "lucide-react"

export default function FloatingBookNow() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full bg-accent text-accent-foreground shadow-lg hover:opacity-90"
        >
          Book Now
        </Button>
      </div>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-2xl rounded-lg bg-card p-2" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute right-3 top-3 rounded-md bg-background/80 p-1 hover:bg-background"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-3">
              <h2 className="text-xl font-semibold mb-3">Enquiry</h2>
              <EnquiryForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
