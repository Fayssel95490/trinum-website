import { NextResponse, type NextRequest } from "next/server";
import { commitFiles } from "@/lib/github";

export const runtime = "nodejs";

const ALLOWED_FILES = new Set([
  "data/home.json",
  "data/contact.json",
  "data/site.json",
  "data/projects.json",
]);

export async function POST(request: NextRequest) {
  let body: { file?: string; content?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { file, content } = body;
  if (!file || content === undefined) {
    return NextResponse.json(
      { error: "Les champs 'file' et 'content' sont requis" },
      { status: 400 }
    );
  }

  if (!ALLOWED_FILES.has(file)) {
    return NextResponse.json(
      { error: `Fichier non autorisé : ${file}` },
      { status: 403 }
    );
  }

  const serialized = JSON.stringify(content, null, 2) + "\n";

  try {
    JSON.parse(serialized);
  } catch {
    return NextResponse.json(
      { error: "Le contenu n'est pas un JSON valide" },
      { status: 400 }
    );
  }

  try {
    const result = await commitFiles(
      [{ path: file, content: serialized, encoding: "utf-8" }],
      `chore(admin): update ${file} via admin panel`
    );
    return NextResponse.json({
      success: true,
      commitSha: result.commitSha,
      commitUrl: result.commitUrl,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Échec du commit : ${message}` },
      { status: 500 }
    );
  }
}
