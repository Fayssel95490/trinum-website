"use client";

import { Button } from "@/components/ui/button";

export function CalendlyButton() {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/trinum-ingenierie/30min";

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-xl text-foreground">
        Préférez un échange direct ?
      </h3>
      <p className="text-sm text-muted-foreground">
        Réservez directement un créneau de 30 min dans notre agenda.
      </p>
      <Button
        onClick={() => window.open(calendlyUrl, "_blank")}
        aria-label="Prendre rendez-vous sur Calendly"
      >
        📅 Prendre rendez-vous sur Calendly
      </Button>
    </div>
  );
}
