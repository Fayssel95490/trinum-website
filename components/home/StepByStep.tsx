import home from "@/data/home.json";

type Step = {
  number: number;
  title: string;
  color: string;
  items: string[];
};

function StepCard({ step }: { step: Step }) {
  const dotColor = step.color === "accent" ? "bg-accent" : "bg-primary";
  const borderColor =
    step.color === "accent" ? "border-accent" : "border-primary";

  return (
    <div className={`rounded-lg border-l-4 ${borderColor} bg-card p-6`}>
      <div className="mb-3 flex items-center gap-3">
        <div className={`h-4 w-4 shrink-0 rounded-full ${dotColor}`} />
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
  const { title, steps } = home.stepByStep;

  return (
    <section className="bg-background px-4 py-20 md:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="heading-xl mb-14 text-center uppercase tracking-wide">
          {title}
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
