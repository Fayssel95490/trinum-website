import { Card, CardContent } from "@/components/ui/card";
import { Users, FileCheck, HardHat, Zap, LucideIcon } from "lucide-react";
import home from "@/data/home.json";

const iconMap: Record<string, LucideIcon> = {
  Users,
  FileCheck,
  HardHat,
  Zap,
};

export function WhyTrinum() {
  const { title, subtitle, reasons } = home.whyTrinum;

  return (
    <section id="prestations" className="bg-background px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="heading-xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((reason) => {
            const Icon = iconMap[reason.icon] ?? Users;
            return (
              <Card key={reason.title} className="border-border">
                <CardContent className="p-6">
                  <Icon className="mb-4 h-8 w-8 text-accent" />
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
