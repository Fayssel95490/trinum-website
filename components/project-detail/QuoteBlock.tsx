interface QuoteBlockProps {
  label: string;
  quote: string;
}

export function QuoteBlock({ label, quote }: QuoteBlockProps) {
  return (
    <div className="quote-block">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-accent" />
        <span className="text-sm font-semibold text-accent">{label}</span>
      </div>
      <p>&ldquo;{quote}&rdquo;</p>
    </div>
  );
}
