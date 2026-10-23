import type { ReactNode } from "react";

// Renders the body of a CMS "Rich text" block. Editors write plain text in the
// admin, using a few simple conventions:
//   # Heading        -> page title
//   ## Heading       -> section heading
//   ### Heading      -> sub-heading
//   - item           -> bullet list (consecutive lines)
//   blank line       -> new paragraph
// Anything else is a paragraph. Nothing here is hardcoded content.

type Piece =
  | { kind: "h1" | "h2" | "h3" | "p"; text: string }
  | { kind: "ul"; items: string[] };

function parse(body: string): Piece[] {
  const pieces: Piece[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) pieces.push({ kind: "p", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) pieces.push({ kind: "ul", items: list });
    list = [];
  };

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (line === "") {
      flushParagraph();
      flushList();
    } else if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      pieces.push({ kind: "h3", text: line.slice(4) });
    } else if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      pieces.push({ kind: "h2", text: line.slice(3) });
    } else if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      pieces.push({ kind: "h1", text: line.slice(2) });
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();
  return pieces;
}

export default function RichText({ body }: { body: string }) {
  const pieces = parse(body);
  if (pieces.length === 0) return null;

  const nodes: ReactNode[] = pieces.map((piece, i) => {
    switch (piece.kind) {
      case "h1":
        return (
          <h1 key={i} className="text-headline text-balance text-foreground">
            {piece.text}
          </h1>
        );
      case "h2":
        return (
          <h2 key={i} className="text-title mt-12 text-foreground first:mt-0">
            {piece.text}
          </h2>
        );
      case "h3":
        return (
          <h3 key={i} className="mt-8 text-lg font-semibold text-foreground">
            {piece.text}
          </h3>
        );
      case "ul":
        return (
          <ul key={i} className="list-disc space-y-2 pl-6 text-lg leading-relaxed text-muted-foreground">
            {piece.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        );
      default:
        return (
          <p key={i} className="text-lg leading-relaxed text-muted-foreground">
            {piece.text}
          </p>
        );
    }
  });

  return (
    <section className="gutter py-12 md:py-16">
      <div className="wide">
        <div className="max-w-[62ch] space-y-5">{nodes}</div>
      </div>
    </section>
  );
}
