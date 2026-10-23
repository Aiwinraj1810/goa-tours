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
    <section className="section-y bg-background">
      <div className="gutter wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-accent-strong">Frequently Asked Questions</p>
            <h2 className="text-headline mt-4 text-balance text-foreground">{heading}</h2>
            {subheading ? (
              <p className="measure mt-5 text-muted-foreground">{subheading}</p>
            ) : null}
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="lg:col-span-8"
        >
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-border first:border-t"
            >
              <AccordionTrigger className="gap-6 py-6 text-left text-lg font-medium hover:no-underline md:text-xl">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="measure pb-6 text-base text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
