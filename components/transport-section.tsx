import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { TransportEntry } from "@/lib/destinations/types";

type Props = {
  transport: TransportEntry[];
  destinationLabel: string;
};

export default function TransportSection({ transport, destinationLabel }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5">
        <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
          Transport
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
          Getting Around {destinationLabel}
        </h2>

        <div className="max-w-4xl space-y-3">
          {transport.map((t, i) => (
            <Accordion key={i} type="single" collapsible>
              <AccordionItem
                value={`transport-${i}`}
                className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="hover:no-underline py-5 gap-4">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-base font-semibold text-foreground">
                      {t.name}
                    </span>
                    <span className="text-sm font-normal text-muted-foreground mt-0.5">
                      {t.location}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t.description}
                  </p>
                  <div className="rounded-xl overflow-hidden h-[260px]">
                    <iframe
                      src={t.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map — ${t.name}`}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
