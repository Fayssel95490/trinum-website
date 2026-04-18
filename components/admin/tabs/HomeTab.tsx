"use client";

import {
  SectionCard,
  FieldText,
  FieldTextarea,
  FieldImage,
  FieldStringArray,
} from "../fields";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type HomeData = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  whyTrinum: {
    title: string;
    subtitle: string;
    reasons: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  fullWidthImage: { src: string; alt: string };
  stepByStep: {
    title: string;
    steps: {
      number: number;
      title: string;
      color: string;
      items: string[];
    }[];
  };
  projectsPreview: { title: string; subtitle: string };
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
};

const ICONS = ["Users", "FileCheck", "HardHat", "Zap"];

export function HomeTab({
  data,
  onChange,
}: {
  data: HomeData;
  onChange: (next: HomeData) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Hero (bannière d'accueil)"
        description="Le grand bloc en haut de la page d'accueil."
      >
        <FieldText
          label="Titre principal"
          value={data.hero}
          onChange={(v) => onChange({ ...data, hero: v })}
          field="title"
        />
        <FieldTextarea
          label="Sous-titre"
          value={data.hero}
          onChange={(v) => onChange({ ...data, hero: v })}
          field="subtitle"
          rows={2}
        />
        <FieldImage
          label="Image hero"
          value={data.hero.image}
          onChange={(src) =>
            onChange({ ...data, hero: { ...data.hero, image: src } })
          }
          helperText="Image principale affichée sous le titre."
        />
        <FieldText
          label="Texte alternatif de l'image"
          value={data.hero}
          onChange={(v) => onChange({ ...data, hero: v })}
          field="imageAlt"
          placeholder="Description pour l'accessibilité"
        />
      </SectionCard>

      <SectionCard
        title="Pourquoi Trinum ?"
        description="Les 4 arguments mis en avant sur la page d'accueil."
      >
        <FieldText
          label="Titre de la section"
          value={data.whyTrinum}
          onChange={(v) => onChange({ ...data, whyTrinum: v })}
          field="title"
        />
        <FieldTextarea
          label="Sous-titre"
          value={data.whyTrinum}
          onChange={(v) => onChange({ ...data, whyTrinum: v })}
          field="subtitle"
          rows={2}
        />
        <div className="space-y-4">
          <Label>Les 4 raisons</Label>
          {data.whyTrinum.reasons.map((reason, idx) => (
            <div
              key={idx}
              className="space-y-3 rounded-md border border-border bg-muted/30 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Raison {idx + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = data.whyTrinum.reasons.filter(
                      (_, i) => i !== idx
                    );
                    onChange({
                      ...data,
                      whyTrinum: { ...data.whyTrinum, reasons: next },
                    });
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <Label>Icône</Label>
                <Select
                  value={reason.icon}
                  onValueChange={(value) => {
                    const next = [...data.whyTrinum.reasons];
                    next[idx] = { ...reason, icon: value };
                    onChange({
                      ...data,
                      whyTrinum: { ...data.whyTrinum, reasons: next },
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICONS.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Titre</Label>
                <Input
                  value={reason.title}
                  onChange={(e) => {
                    const next = [...data.whyTrinum.reasons];
                    next[idx] = { ...reason, title: e.target.value };
                    onChange({
                      ...data,
                      whyTrinum: { ...data.whyTrinum, reasons: next },
                    });
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <textarea
                  value={reason.description}
                  onChange={(e) => {
                    const next = [...data.whyTrinum.reasons];
                    next[idx] = { ...reason, description: e.target.value };
                    onChange({
                      ...data,
                      whyTrinum: { ...data.whyTrinum, reasons: next },
                    });
                  }}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...data,
                whyTrinum: {
                  ...data.whyTrinum,
                  reasons: [
                    ...data.whyTrinum.reasons,
                    { icon: "Users", title: "", description: "" },
                  ],
                },
              })
            }
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            Ajouter une raison
          </Button>
        </div>
      </SectionCard>

      <SectionCard
        title="Image pleine largeur"
        description="Grande image située entre les sections."
      >
        <FieldImage
          label="Image"
          value={data.fullWidthImage.src}
          onChange={(src) =>
            onChange({
              ...data,
              fullWidthImage: { ...data.fullWidthImage, src },
            })
          }
        />
        <FieldText
          label="Texte alternatif"
          value={data.fullWidthImage}
          onChange={(v) => onChange({ ...data, fullWidthImage: v })}
          field="alt"
        />
      </SectionCard>

      <SectionCard
        title="Étapes du projet"
        description="Les étapes affichées dans la section 'Votre projet étape par étape'."
      >
        <FieldText
          label="Titre de la section"
          value={data.stepByStep}
          onChange={(v) => onChange({ ...data, stepByStep: v })}
          field="title"
        />
        <div className="space-y-4">
          <Label>Étapes</Label>
          {data.stepByStep.steps.map((step, idx) => (
            <div
              key={idx}
              className="space-y-3 rounded-md border border-border bg-muted/30 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Étape {step.number}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = data.stepByStep.steps.filter(
                      (_, i) => i !== idx
                    );
                    onChange({
                      ...data,
                      stepByStep: { ...data.stepByStep, steps: next },
                    });
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Numéro</Label>
                  <Input
                    type="number"
                    value={step.number}
                    onChange={(e) => {
                      const next = [...data.stepByStep.steps];
                      next[idx] = { ...step, number: Number(e.target.value) };
                      onChange({
                        ...data,
                        stepByStep: { ...data.stepByStep, steps: next },
                      });
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Couleur</Label>
                  <Select
                    value={step.color}
                    onValueChange={(value) => {
                      const next = [...data.stepByStep.steps];
                      next[idx] = { ...step, color: value };
                      onChange({
                        ...data,
                        stepByStep: { ...data.stepByStep, steps: next },
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accent">Accent</SelectItem>
                      <SelectItem value="primary">Primary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Titre</Label>
                <Input
                  value={step.title}
                  onChange={(e) => {
                    const next = [...data.stepByStep.steps];
                    next[idx] = { ...step, title: e.target.value };
                    onChange({
                      ...data,
                      stepByStep: { ...data.stepByStep, steps: next },
                    });
                  }}
                />
              </div>
              <FieldStringArray
                label="Points"
                value={step.items}
                onChange={(items) => {
                  const next = [...data.stepByStep.steps];
                  next[idx] = { ...step, items };
                  onChange({
                    ...data,
                    stepByStep: { ...data.stepByStep, steps: next },
                  });
                }}
                placeholder="Un point..."
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...data,
                stepByStep: {
                  ...data.stepByStep,
                  steps: [
                    ...data.stepByStep.steps,
                    {
                      number: data.stepByStep.steps.length + 1,
                      title: "",
                      color: "primary",
                      items: [],
                    },
                  ],
                },
              })
            }
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            Ajouter une étape
          </Button>
        </div>
      </SectionCard>

      <SectionCard
        title="Références & Réalisations"
        description="Titre et sous-titre de la section projets sur la page d'accueil."
      >
        <FieldText
          label="Titre"
          value={data.projectsPreview}
          onChange={(v) => onChange({ ...data, projectsPreview: v })}
          field="title"
        />
        <FieldTextarea
          label="Sous-titre"
          value={data.projectsPreview}
          onChange={(v) => onChange({ ...data, projectsPreview: v })}
          field="subtitle"
          rows={2}
        />
      </SectionCard>

      <SectionCard
        title="Appel à l'action (bas de page)"
        description="Bloc 'Évaluez votre projet' en bas de la page d'accueil."
      >
        <FieldText
          label="Titre"
          value={data.cta}
          onChange={(v) => onChange({ ...data, cta: v })}
          field="title"
        />
        <FieldTextarea
          label="Description"
          value={data.cta}
          onChange={(v) => onChange({ ...data, cta: v })}
          field="description"
          rows={3}
        />
        <FieldText
          label="Libellé du bouton"
          value={data.cta}
          onChange={(v) => onChange({ ...data, cta: v })}
          field="buttonLabel"
        />
        <FieldText
          label="Lien du bouton"
          value={data.cta}
          onChange={(v) => onChange({ ...data, cta: v })}
          field="buttonHref"
          placeholder="/contact"
        />
      </SectionCard>
    </div>
  );
}
