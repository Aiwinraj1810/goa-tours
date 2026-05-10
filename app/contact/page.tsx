import CommonContainer from "@/components/CommonConatiner";
import EnquiryForm from "@/components/enquiry-form";
import ScrollToFormButton from "@/components/scroll-to-form-button";
import { CONTACT } from "@/lib/constants";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    values: CONTACT.phones,
  },
  {
    icon: Mail,
    label: "Email",
    values: [{ value: CONTACT.email, href: CONTACT.emailHref }],
  },
  {
    icon: MapPin,
    label: "Address",
    values: [{ value: CONTACT.address, href: undefined }],
  },
];

export default function ContactPage() {
  return (
    <CommonContainer>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold mb-2 text-balance">
          Contact & Enquiries
        </h1>
        <p className="text-muted-foreground mb-8">
          Send us your travel dates and preferences—we'll get back with the
          perfect Goa itinerary.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Left column — contact info */}
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-6">
              {contactDetails.map(({ icon: Icon, label, values }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-0.5">
                      {label}
                    </p>
                    {values.map(({ value, href }) =>
                      href ? (
                        <a
                          key={value}
                          href={href}
                          className="text-foreground hover:text-primary transition-colors block"
                        >
                          {value}
                        </a>
                      ) : (
                        <p key={value} className="text-foreground text-pretty">
                          {value}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Reassurance line */}
            <div className="flex items-start gap-3 border-t pt-6">
              <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your details are safe with us. We never share your personal
                information with third parties, and our team responds within
                24 hours.
              </p>
            </div>
          </div>

          {/* Right column — enquiry form */}
          <div id="enquiry-form">
            <EnquiryForm />
          </div>
        </div>
      </div>

      <ScrollToFormButton />
    </CommonContainer>
  );
}
