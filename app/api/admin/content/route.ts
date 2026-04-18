import { NextResponse, type NextRequest } from "next/server";
import { readFile } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_FILES = new Set([
  "data/home.json",
  "data/contact.json",
  "data/site.json",
  "data/projects.json",
]);

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get("file");
  if (!file || !ALLOWED_FILES.has(file)) {
    return NextResponse.json(
      { error: "Fichier non autorisé" },
      { status: 400 }
    );
  }

  try {
    const content = await readFile(file);
    if (content === null) {
      return NextResponse.json(
        { error: "Fichier introuvable" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      file,
      content: JSON.parse(content),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Échec lecture : ${message}` },
      { status: 500 }
    );
  }
}
