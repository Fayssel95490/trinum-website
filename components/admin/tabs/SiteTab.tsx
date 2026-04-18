"use client";

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SectionCard,
  FieldText,
  FieldTextarea,
  FieldImage,
} from "../fields";

export type SiteData = {
  company: string;
  tagline: string;
  description: string;
  contact: { email: string; phone: string; linkedin: string };
  navigation: { label: string; href: string }[];
  trustedBy: { name: string; logo: string }[];
};

export function SiteTab({
  data,
  onChange,
}: {
  data: SiteData;
  onChange: (next: SiteData) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Informations société"
        description="Nom, tagline et description générales."
      >
        <FieldText
          label="Nom de la société"
          value={data}
          onChange={onChange}
          field="company"
        />
        <FieldText
          label="Tagline"
          value={data}
          onChange={onChange}
          field="tagline"
        />
        <FieldTextarea
          label="Description"
          value={data}
          onChange={onChange}
          field="description"
          rows={2}
        />
      </SectionCard>

      <SectionCard
        title="Coordonnées"
        description="Email, téléphone et lien LinkedIn."
      >
        <FieldText
          label="Email"
          value={data.contact}
          onChange={(v) => onChange({ ...data, contact: v })}
          field="email"
        />
        <FieldText
          label="Téléphone"
          value={data.contact}
          onChange={(v) => onChange({ ...data, contact: v })}
          field="phone"
        />
        <FieldText
          label="LinkedIn"
          value={data.contact}
          onChange={(v) => onChange({ ...data, contact: v })}
          field="linkedin"
          placeholder="https://www.linkedin.com/..."
        />
      </SectionCard>

      <SectionCard
        title="Navigation"
        description="Liens du menu principal."
      >
        <div className="space-y-3">
          {data.navigation.map((link, idx) => (
            <div key={idx} className="flex items-end gap-2">
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs">Libellé</Label>
                <Input
                  value={link.label}
                  onChange={(e) => {
                    const next = [...data.navigation];
                    next[idx] = { ...link, label: e.target.value };
                    onChange({ ...data, navigation: next });
                  }}
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label className="text-xs">Lien</Label>
                <Input
                  value={link.href}
                  onChange={(e) => {
                    const next = [...data.navigation];
                    next[idx] = { ...link, href: e.target.value };
                    onChange({ ...data, navigation: next });
                  }}
                  placeholder="/contact"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (idx === 0) return;
                  const next = [...data.navigation];
                  [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                  onChange({ ...data, navigation: next });
                }}
                disabled={idx === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (idx === data.navigation.length - 1) return;
                  const next = [...data.navigation];
                  [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                  onChange({ ...data, navigation: next });
                }}
                disabled={idx === data.navigation.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  onChange({
                    ...data,
                    navigation: data.navigation.filter((_, i) => i !== idx),
                  })
                }
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...data,
                navigation: [...data.navigation, { label: "", href: "" }],
              })
            }
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            Ajouter un lien
          </Button>
        </div>
      </SectionCard>

      <SectionCard
        title="Logos partenaires"
        description="Logos affichés dans la section 'Trusted by'."
      >
        <div className="space-y-4">
          {data.trustedBy.map((partner, idx) => (
            <div
              key={idx}
              className="space-y-3 rounded-md border border-border bg-muted/30 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Partenaire {idx + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    onChange({
                      ...data,
                      trustedBy: data.trustedBy.filter((_, i) => i !== idx),
                    })
                  }
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
              <div className="space-y-1.5">
                <Label>Nom</Label>
                <Input
                  value={partner.name}
                  onChange={(e) => {
                    const next = [...data.trustedBy];
                    next[idx] = { ...partner, name: e.target.value };
                    onChange({ ...data, trustedBy: next });
                  }}
                />
              </div>
              <FieldImage
                label="Logo"
                value={partner.logo}
                folder="logos"
                onChange={(logo) => {
                  const next = [...data.trustedBy];
                  next[idx] = { ...partner, logo };
                  onChange({ ...data, trustedBy: next });
                }}
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
                trustedBy: [...data.trustedBy, { name: "", logo: "" }],
              })
            }
          >
            <Plus className="mr-2 h-3.5 w-3.5" />
            Ajouter un partenaire
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
