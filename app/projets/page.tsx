import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Nos Projets — Trinum Ingénierie",
  description:
    "Découvrez nos références en ingénierie CVSE : Tour Triangle Paris, FEV Genève, Villa Clos Harmonie Aix-en-Provence.",
};

export default function ProjetsPage() {
  return (
    <section className="bg-[var(--background)] px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="heading-xl">Nos Projets</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--muted-foreground)]">
            Études de cas détaillées de nos réalisations en ingénierie CVSE —
            du logement collectif à l&apos;IGH, du tertiaire à la maison
            individuelle haut de gamme.
          </p>
        </div>
        <ProjectGrid />
      </div>
    </section>
  );
}
