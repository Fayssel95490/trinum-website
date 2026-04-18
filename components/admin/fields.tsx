"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Plus, Trash2, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export function FieldText<T extends Record<string, unknown>>({
  label,
  value,
  onChange,
  field,
  placeholder,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  field: StringKeys<T>;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        value={(value[field] as string) ?? ""}
        onChange={(e) =>
          onChange({ ...value, [field]: e.target.value } as T)
        }
        placeholder={placeholder}
      />
    </div>
  );
}

export function FieldTextarea<T extends Record<string, unknown>>({
  label,
  value,
  onChange,
  field,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  field: StringKeys<T>;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Textarea
        value={(value[field] as string) ?? ""}
        onChange={(e) =>
          onChange({ ...value, [field]: e.target.value } as T)
        }
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}

export function FieldImage({
  label,
  value,
  onChange,
  folder = "projects",
  helperText,
}: {
  label: string;
  value: string;
  onChange: (path: string) => void;
  folder?: "projects" | "logos";
  helperText?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Échec de l'upload");
        return;
      }
      onChange(data.url);
      toast.success("Image uploadée avec succès");
    } catch {
      toast.error("Erreur réseau lors de l'upload");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      <div className="flex items-start gap-4">
        {value ? (
          <div className="relative h-24 w-32 overflow-hidden rounded-md border border-border bg-muted">
            <Image
              src={value}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex h-24 w-32 items-center justify-center rounded-md border border-dashed border-border bg-muted text-xs text-muted-foreground">
            Aucune image
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                Upload en cours...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-3.5 w-3.5" />
                Changer l&apos;image
              </>
            )}
          </Button>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/projects/..."
            className="text-xs"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex w-fit items-center text-xs text-muted-foreground hover:text-destructive"
            >
              <X className="mr-1 h-3 w-3" />
              Retirer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function FieldStringArray({
  label,
  value,
  onChange,
  placeholder,
  helperText,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  helperText?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      <div className="space-y-2">
        {value.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => {
                const next = [...value];
                next[idx] = e.target.value;
                onChange(next);
              }}
              placeholder={placeholder}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                const next = [...value];
                if (idx > 0) {
                  [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                  onChange(next);
                }
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
                const next = [...value];
                if (idx < next.length - 1) {
                  [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                  onChange(next);
                }
              }}
              disabled={idx === value.length - 1}
              aria-label="Descendre"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChange(value.filter((_, i) => i !== idx))}
              aria-label="Supprimer"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, ""])}
      >
        <Plus className="mr-2 h-3.5 w-3.5" />
        Ajouter
      </Button>
    </div>
  );
}

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-background p-6 shadow-sm">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function SaveBar({
  onSave,
  saving,
  dirty,
}: {
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-8 flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 shadow-lg">
      <div className="text-sm text-muted-foreground">
        {dirty ? (
          <span className="text-amber-600">Modifications non enregistrées</span>
        ) : (
          "À jour"
        )}
      </div>
      <Button onClick={onSave} disabled={!dirty || saving}>
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enregistrement...
          </>
        ) : (
          "Enregistrer et publier"
        )}
      </Button>
    </div>
  );
}
