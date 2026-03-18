import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import projects from "@/data/projects.json";
import { ProjectHero } from "@/components/project-detail/ProjectHero";
import { QuoteBlock } from "@/components/project-detail/QuoteBlock";
import { ProjectSection } from "@/components/project-detail/ProjectSection";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Projet introuvable" };

  return {
    title: `${project.title} — Trinum Ingénierie`,
    description: project.context.slice(0, 160),
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="bg-background">
      <ProjectHero
        title={project.title}
        tags={project.tags}
        heroImage={project.heroImage}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <ProjectSection label="Contexte">
          <p className="leading-relaxed text-foreground">{project.context}</p>
        </ProjectSection>

        <ProjectSection label={project.challengesTitle}>
          <ul className="bullet-accent list-disc space-y-3 pl-5">
            {project.challenges.map((challenge, i) => (
              <li key={i} className="leading-relaxed text-foreground">
                {challenge}
              </li>
            ))}
          </ul>
        </ProjectSection>

        <QuoteBlock label={project.quoteLabel} quote={project.quote} />

        <div className="mt-10">
          <ProjectSection label={project.technicalTitle}>
            <div
              className="prose max-w-none leading-relaxed text-foreground [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{
                __html: project.technicalContent,
              }}
            />
          </ProjectSection>
        </div>

        {project.secondImage && (
          <div className="relative my-10 aspect-video overflow-hidden rounded-xl">
            <Image
              src={project.secondImage}
              alt={`${project.title} — vue détaillée`}
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
        )}

        {project.synthesisTitle && project.synthesisContent && (
          <ProjectSection label={project.synthesisTitle}>
            <p className="leading-relaxed text-foreground">
              {project.synthesisContent}
            </p>
          </ProjectSection>
        )}

        <ProjectSection label={project.conclusionTitle}>
          <p className="leading-relaxed text-foreground">
            {project.conclusionContent}
          </p>
        </ProjectSection>
      </div>
    </article>
  );
}
