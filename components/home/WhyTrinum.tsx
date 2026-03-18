import { Card, CardContent } from "@/components/ui/card";
import { Users, FileCheck, HardHat, Zap } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Un seul interlocuteur, des arbitrages rapides",
    description:
      "Vous échangez avec un ingénieur dédié qui connaît votre projet. Pas de perte d'information, pas de délai de transmission entre services.",
  },
  {
    icon: FileCheck,
    title: "Conception conforme et prête à autoriser",
    description:
      "Nos études intègrent dès le départ les exigences réglementaires (DTU, NF, SIA). Résultat : moins d'itérations, des dossiers solides dès la première soumission.",
  },
  {
    icon: HardHat,
    title: "Plans & BIM orientés chantiers",
    description:
      "Nos livrables sont pensés pour l'exécution : plans cotés, schémas de principe exploitables, maquettes BIM coordonnées avec les autres lots.",
  },
  {
    icon: Zap,
    title: "Rigueur grand compte, agilité d'une petite équipe",
    description:
      "La méthodologie et la traçabilité d'un grand bureau, avec la réactivité et la proximité d'une structure à taille humaine.",
  },
];

export function WhyTrinum() {
  return (
    <section id="prestations" className="bg-background px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="heading-xl">Pourquoi Trinum ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Un bureau d&apos;ingénieurs réactif, cadré et facile à activer pour
            vos projets CVSE.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((reason) => (
            <Card key={reason.title} className="border-border">
              <CardContent className="p-6">
                <reason.icon className="mb-4 h-8 w-8 text-accent" />
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
