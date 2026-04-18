import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { CalendlyButton } from "@/components/contact/CalendlyButton";
import { Separator } from "@/components/ui/separator";
import contact from "@/data/contact.json";

export const metadata: Metadata = {
  title: "Contact — Trinum Ingénierie",
  description:
    "Contactez Trinum Ingénierie pour évaluer votre projet CVSE. Formulaire de contact ou prise de rendez-vous directe.",
};

export default function ContactPage() {
  return (
    <section className="bg-[var(--background)] px-4 py-20 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="heading-xl">{contact.page.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--muted-foreground)]">
            {contact.page.subtitle}
          </p>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <h2 className="mb-6 font-serif text-2xl text-[var(--foreground)]">
              {contact.page.formTitle}
            </h2>
            <ContactForm />
          </div>

          <div className="hidden items-center md:flex md:flex-col">
            <Separator orientation="vertical" className="h-64" />
            <span className="my-4 text-sm font-medium text-[var(--muted-foreground)]">
              {contact.page.orLabel}
            </span>
            <Separator orientation="vertical" className="h-64" />
          </div>

          <div className="md:hidden">
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-sm font-medium text-[var(--muted-foreground)]">
                {contact.page.orLabel}
              </span>
              <Separator className="flex-1" />
            </div>
          </div>

          <div className="flex items-center md:min-h-[400px]">
            <CalendlyButton />
          </div>
        </div>
      </div>
    </section>
  );
}
