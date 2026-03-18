import { ProjectCard } from "./ProjectCard";
import projects from "@/data/projects.json";

export function ProjectGrid() {
  return (
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
  );
}
