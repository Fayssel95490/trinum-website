"use client";

import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";

const Editor = dynamic(
  () => import("react-simple-wysiwyg").then((m) => m.default),
  { ssr: false, loading: () => <div className="h-40 rounded-md border border-border bg-muted" /> }
);

export function RichTextField({
  label,
  value,
  onChange,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  helperText?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      <div className="rounded-md border border-border bg-background [&_.rsw-editor]:min-h-[200px] [&_.rsw-ce]:min-h-[200px] [&_.rsw-ce]:p-3 [&_.rsw-ce]:outline-none [&_.rsw-toolbar]:border-b [&_.rsw-toolbar]:border-border [&_.rsw-toolbar]:bg-muted/50">
        <Editor value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}
