"use client";

import { useState } from "react";
import {
  SectionCard,
  FieldText,
  FieldTextarea,
  FieldImage,
  FieldStringArray,
} from "../fields";
import { RichTextField } from "../RichTextField";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  Pencil,
} from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  heroImage: string;
  secondImage: string;
  highlights: string[];
  context: string;
  challengesTitle: string;
  challenges: string[];
  quoteLabel: string;
  quote: string;
  technicalTitle: string;
  technicalContent: string;
  synthesisTitle: string;
  synthesisContent: string;
  conclusionTitle: string;
  conclusionContent: string;
};

export type ProjectsData = Project[];

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function emptyProject(): Project {
  return {
    slug: "",
    title: "",
    subtitle: "",
    tags: [],
    heroImage: "",
    secondImage: "",
    highlights: [],
    context: "",
    challengesTitle: "Les défis du projet",
    challenges: [],
    quoteLabel: "Notre mission :",
    quote: "",
    technicalTitle: "Choix techniques",
    technicalContent: "",
    synthesisTitle: "",
    synthesisContent: "",
    conclusionTitle: "Conclusion",
    conclusionContent: "",
  };
}

export function ProjectsTab({
  data,
  onChange,
}: {
  data: ProjectsData;
  onChange: (next: ProjectsData) => void;
}) {
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  if (editingIdx !== null && data[editingIdx]) {
    const project = data[editingIdx];
    const updateProject = (next: Project) => {
      const nextArr = [...data];
      nextArr[editingIdx] = next;
      onChange(nextArr);
    };

    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => setEditingIdx(null)}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Retour à la liste des projets
        </button>

        <SectionCard title="Informations principales">
          <FieldText
            label="Titre"
            value={project}
            onChange={updateProject}
            field="title"
          />
          <FieldText
            label="Slug (URL)"
            value={project}
            onChange={updateProject}
            field="slug"
            placeholder="tour-triangle-paris"
          />
          <p className="-mt-3 text-xs text-muted-foreground">
            URL finale : /projets/{project.slug || "..."}
          </p>
          <FieldTextarea
            label="Sous-titre"
            value={project}
            onChange={updateProject}
            field="subtitle"
            rows={2}
          />
          <FieldStringArray
            label="Tags"
            value={project.tags}
            onChange={(tags) => updateProject({ ...project, tags })}
            placeholder="Ex: Sanitaire, IGH..."
          />
        </SectionCard>

        <SectionCard title="Images">
          <FieldImage
            label="Image principale (hero)"
            value={project.heroImage}
            onChange={(heroImage) => updateProject({ ...project, heroImage })}
          />
          <FieldImage
            label="Image secondaire (intérieur)"
            value={project.secondImage}
            onChange={(secondImage) =>
              updateProject({ ...project, secondImage })
            }
          />
        </SectionCard>

        <SectionCard
          title="Points forts (liste sur la carte du projet)"
          description="Affichés comme bullets sur la carte de la page d'accueil et /projets."
        >
          <FieldStringArray
            label="Points forts"
            value={project.highlights}
            onChange={(highlights) =>
              updateProject({ ...project, highlights })
            }
            placeholder="Un point fort..."
          />
        </SectionCard>

        <SectionCard title="Contexte">
          <FieldTextarea
            label="Contexte du projet"
            value={project}
            onChange={updateProject}
            field="context"
            rows={6}
          />
        </SectionCard>

        <SectionCard title="Contraintes / Défis">
          <FieldText
            label="Titre de la section"
            value={project}
            onChange={updateProject}
            field="challengesTitle"
          />
          <FieldStringArray
            label="Liste des défis"
            value={project.challenges}
            onChange={(challenges) =>
              updateProject({ ...project, challenges })
            }
            placeholder="Un défi..."
          />
        </SectionCard>

        <SectionCard title="Citation / Mission">
          <FieldText
            label="Libellé (ex: Notre mission :)"
            value={project}
            onChange={updateProject}
            field="quoteLabel"
          />
          <FieldTextarea
            label="Citation"
            value={project}
            onChange={updateProject}
            field="quote"
            rows={3}
          />
        </SectionCard>

        <SectionCard title="Section technique">
          <FieldText
            label="Titre"
            value={project}
            onChange={updateProject}
            field="technicalTitle"
          />
          <RichTextField
            label="Contenu (mise en forme riche)"
            value={project.technicalContent}
            onChange={(technicalContent) =>
              updateProject({ ...project, technicalContent })
            }
            helperText="Vous pouvez mettre des mots en gras, en italique, créer des listes, etc."
          />
        </SectionCard>

        <SectionCard title="Synthèse / Coordination (optionnel)">
          <FieldText
            label="Titre"
            value={project}
            onChange={updateProject}
            field="synthesisTitle"
          />
          <FieldTextarea
            label="Contenu"
            value={project}
            onChange={updateProject}
            field="synthesisContent"
            rows={5}
          />
        </SectionCard>

        <SectionCard title="Conclusion">
          <FieldText
            label="Titre"
            value={project}
            onChange={updateProject}
            field="conclusionTitle"
          />
          <FieldTextarea
            label="Contenu"
            value={project}
            onChange={updateProject}
            field="conclusionContent"
            rows={5}
          />
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {data.length} projet{data.length > 1 ? "s" : ""}
        </p>
        <Button
          type="button"
          onClick={() => {
            const next = [...data, emptyProject()];
            onChange(next);
            setEditingIdx(next.length - 1);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un projet
        </Button>
      </div>

      <div className="space-y-2">
        {data.map((project, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 rounded-lg border border-border bg-background p-4"
          >
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium text-foreground">
                {project.title || (
                  <span className="italic text-muted-foreground">
                    Sans titre
                  </span>
                )}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                /projets/{project.slug || "..."}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (idx === 0) return;
                  const next = [...data];
                  [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                  onChange(next);
                }}
                disabled={idx === 0}
                aria-label="Monter"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (idx === data.length - 1) return;
                  const next = [...data];
                  [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                  onChange(next);
                }}
                disabled={idx === data.length - 1}
                aria-label="Descendre"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditingIdx(idx)}
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" />
                Éditer
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (
                    confirm(
                      `Supprimer le projet "${project.title}" ? Cette action sera commitée à l'enregistrement.`
                    )
                  ) {
                    onChange(data.filter((_, i) => i !== idx));
                  }
                }}
                aria-label="Supprimer"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="rounded-lg border border-dashed border-border bg-background p-8 text-center text-sm text-muted-foreground">
          Aucun projet. Cliquez sur &laquo; Ajouter un projet &raquo; pour
          commencer.
        </div>
      )}
    </div>
  );
}

export { slugify };
