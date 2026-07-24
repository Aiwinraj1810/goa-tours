import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ClimateEntry } from "@/lib/destinations/types";

type Props = {
  climate: ClimateEntry[];
  destinationLabel: string;
};

export default function ClimateSection({ climate, destinationLabel }: Props) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-5">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
            Climate
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
            When to Visit {destinationLabel}
          </h2>

          <Accordion type="single" collapsible defaultValue="climate-0" className="space-y-3">
            {climate.map((entry, i) => (
              <AccordionItem
                key={i}
                value={`climate-${i}`}
                className="bg-background border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="hover:no-underline py-5 gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-left">
                    <span className="text-base font-semibold text-foreground">
                      {entry.period}
                    </span>
                    <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 shrink-0">
                      {entry.summary}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {entry.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
