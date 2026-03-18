import { ProjectCard } from "@/components/projects/ProjectCard";
import projects from "@/data/projects.json";

export function ProjectsPreview() {
  return (
    <section className="bg-background px-4 py-20 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="heading-xl">Références &amp; Réalisations</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Une solution qui vous fait économiser du temps et de l&apos;énergie.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              image={project.heroImage}
              title={project.title}
              subtitle={project.subtitle}
              highlights={project.highlights}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
