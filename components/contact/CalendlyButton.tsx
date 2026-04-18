"use client";

import { Button } from "@/components/ui/button";
import contact from "@/data/contact.json";

export function CalendlyButton() {
  const calendlyUrl =
    contact.calendlyUrl ||
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/trinum-ing-info/30min";

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-xl text-foreground">
        {contact.calendly.title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {contact.calendly.description}
      </p>
      <Button
        onClick={() => window.open(calendlyUrl, "_blank")}
        aria-label="Prendre rendez-vous sur Calendly"
      >
        {contact.calendly.buttonLabel}
      </Button>
    </div>
  );
}
