import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import {
  sendContactNotification,
  sendContactConfirmation,
} from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    await sendContactNotification(data);
    await sendContactConfirmation(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur API contact:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi." },
      { status: 500 }
    );
  }
}
