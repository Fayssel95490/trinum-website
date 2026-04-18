"use client";

import {
  SectionCard,
  FieldText,
  FieldTextarea,
  FieldStringArray,
} from "../fields";

export type ContactData = {
  calendlyUrl: string;
  page: {
    title: string;
    subtitle: string;
    formTitle: string;
    orLabel: string;
  };
  calendly: {
    title: string;
    description: string;
    buttonLabel: string;
  };
  projectTypes: string[];
};

export function ContactTab({
  data,
  onChange,
}: {
  data: ContactData;
  onChange: (next: ContactData) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Lien Calendly"
        description="URL vers votre page Calendly de prise de rendez-vous."
      >
        <FieldText
          label="URL Calendly"
          value={data}
          onChange={onChange}
          field="calendlyUrl"
          placeholder="https://calendly.com/..."
        />
      </SectionCard>

      <SectionCard
        title="Page Contact"
        description="Textes affichés sur la page /contact."
      >
        <FieldText
          label="Titre"
          value={data.page}
          onChange={(v) => onChange({ ...data, page: v })}
          field="title"
        />
        <FieldTextarea
          label="Sous-titre"
          value={data.page}
          onChange={(v) => onChange({ ...data, page: v })}
          field="subtitle"
          rows={2}
        />
        <FieldText
          label="Titre du formulaire"
          value={data.page}
          onChange={(v) => onChange({ ...data, page: v })}
          field="formTitle"
        />
        <FieldText
          label="Séparateur (ex: ou)"
          value={data.page}
          onChange={(v) => onChange({ ...data, page: v })}
          field="orLabel"
        />
      </SectionCard>

      <SectionCard
        title="Bloc Calendly (page contact)"
        description="Le bloc à droite du formulaire de contact."
      >
        <FieldText
          label="Titre"
          value={data.calendly}
          onChange={(v) => onChange({ ...data, calendly: v })}
          field="title"
        />
        <FieldTextarea
          label="Description"
          value={data.calendly}
          onChange={(v) => onChange({ ...data, calendly: v })}
          field="description"
          rows={2}
        />
        <FieldText
          label="Libellé du bouton"
          value={data.calendly}
          onChange={(v) => onChange({ ...data, calendly: v })}
          field="buttonLabel"
        />
      </SectionCard>

      <SectionCard
        title="Types de projets"
        description="Options du menu déroulant 'Type de projet' dans le formulaire."
      >
        <FieldStringArray
          label="Types"
          value={data.projectTypes}
          onChange={(next) => onChange({ ...data, projectTypes: next })}
          placeholder="Ex: Logements collectifs"
        />
      </SectionCard>
    </div>
  );
}
