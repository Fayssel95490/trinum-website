interface QuoteBlockProps {
  label: string;
  quote: string;
}

export function QuoteBlock({ label, quote }: QuoteBlockProps) {
  return (
    <div className="quote-block text-center">
      <div className="mb-4 flex items-center justify-center gap-2">
        <div className="h-6 w-6 shrink-0 rounded-full bg-accent" />
        <span className="text-sm font-semibold text-accent">{label}</span>
      </div>
      <p className="text-balance">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}
