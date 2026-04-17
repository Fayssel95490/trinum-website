const steps = [
  {
    number: 1,
    title: "Cadrage & données",
    color: "accent" as const,
    items: [
      "Besoins clarifiés.",
      "Documents collectés.",
      "Contraintes et périmètre validés.",
    ],
  },
  {
    number: 2,
    title: "Avant-projet (APS/APD)",
    color: "primary" as const,
    items: [
      "Variantes proposées.",
      "Dimensionnements préliminaires.",
      "Solution optimale retenue.",
    ],
  },
  {
    number: 3,
    title: "Projet & coordination",
    color: "primary" as const,
    items: [
      "Plans détaillés.",
      "Interfaces CET coordonnées.",
      "Pièces d'appel d'offres prêtes.",
    ],
  },
  {
    number: 4,
    title: "Exécution & mise en service",
    color: "accent" as const,
    items: [
      "Support chantier.",
      "Ajustements maîtrisés.",
      "Essais et réception accompagnés.",
    ],
  },
];

function StepCard({
  step,
}: {
  step: (typeof steps)[number];
}) {
  const dotColor =
    step.color === "accent" ? "bg-accent" : "bg-primary";
  const borderColor =
    step.color === "accent" ? "border-accent" : "border-primary";

  return (
    <div className={`rounded-lg border-l-4 ${borderColor} bg-card p-6`}>
      <div className="mb-3 flex items-center gap-3">
        <div
          className={`h-4 w-4 shrink-0 rounded-full ${dotColor}`}
        />
        <h3 className="text-base font-bold text-foreground">
          {step.number}. {step.title}
        </h3>
      </div>
      <ul className="ml-7 space-y-1">
        {step.items.map((item) => (
          <li
            key={item}
            className="text-sm leading-relaxed text-foreground/80 before:mr-2 before:content-['•']"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StepByStep() {
  return (
    <section className="bg-background px-4 py-20 md:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="heading-xl mb-14 text-center uppercase tracking-wide">
          Votre projet étape par étape
        </h2>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
