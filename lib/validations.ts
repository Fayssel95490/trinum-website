import { z } from "zod";

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "Le prénom est requis")
    .max(100, "Le prénom est trop long"),
  lastName: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom est trop long"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Le type de projet est requis"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
