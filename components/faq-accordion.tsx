import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  heading: string;
  subheading: string;
  items: FaqItem[];
};

export default function FaqAccordion({ heading, subheading, items }: FaqAccordionProps) {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
          Frequently Asked Questions
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-foreground md:text-4xl">
          {heading}
        </h2>
        {subheading ? (
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subheading}</p>
        ) : null}
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="faq-0"
        className="mt-10 grid gap-x-10 md:grid-cols-2"
      >
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
            <AccordionTrigger className="gap-4 py-5 hover:no-underline">
              <span className="flex items-center gap-3 text-base font-medium">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-10 text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
