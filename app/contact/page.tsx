import EnquiryForm from "@/components/enquiry-form"
import ExistingEnquiries from "@/components/existing-enquiries"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2 text-balance">Contact & Enquiries</h1>
      <p className="text-muted-foreground mb-8">
        Send us your travel dates and preferences—we’ll get back with the perfect Goa itinerary.
      </p>
      <div className="grid gap-10 md:grid-cols-2">
        <EnquiryForm />
        <ExistingEnquiries />
      </div>
    </div>
  )
}
