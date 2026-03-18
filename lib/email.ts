import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailParams {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  projectType: string;
  message?: string;
}

export async function sendContactNotification(data: ContactEmailParams) {
  await resend.emails.send({
    from: "site@trinum-ingenierie.fr",
    to: process.env.CONTACT_EMAIL!,
    subject: `Nouvelle demande — ${data.projectType}`,
    html: `
      <h2>Nouvelle demande de contact</h2>
      <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.phone || "Non renseigné"}</p>
      <p><strong>Type de projet :</strong> ${data.projectType}</p>
      <p><strong>Message :</strong> ${data.message || "Aucun message"}</p>
    `,
  });
}

export async function sendContactConfirmation(data: ContactEmailParams) {
  await resend.emails.send({
    from: "contact@trinum-ingenierie.fr",
    to: data.email,
    subject: "Nous avons bien reçu votre demande — Trinum Ingénierie",
    html: `
      <p>Bonjour ${data.firstName},</p>
      <p>Nous avons bien reçu votre demande concernant votre projet de type <strong>${data.projectType}</strong>.</p>
      <p>Notre équipe vous répondra dans les 24 heures ouvrées.</p>
      <p>À bientôt,<br/>L'équipe Trinum Ingénierie</p>
    `,
  });
}
