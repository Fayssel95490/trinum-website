import { NextResponse, type NextRequest } from "next/server";
import { commitFiles } from "@/lib/github";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const ALLOWED_FOLDERS = new Set(["logos", "projects"]);

function sanitizeFilename(name: string): string {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
  return base || "image";
}

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json(
      { error: "FormData invalide" },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  const folder = (formData.get("folder") as string) || "projects";

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Aucun fichier fourni" },
      { status: 400 }
    );
  }

  if (!ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json(
      { error: `Dossier non autorisé : ${folder}` },
      { status: 400 }
    );
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      {
        error: `Type de fichier non autorisé : ${file.type}. Formats acceptés : JPEG, PNG, WebP, GIF, SVG`,
      },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "L'image dépasse 5 Mo" },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const originalName = file.name || "image";
  const dotIdx = originalName.lastIndexOf(".");
  const ext =
    dotIdx > -1 ? originalName.slice(dotIdx).toLowerCase() : ".png";
  const baseName = sanitizeFilename(
    dotIdx > -1 ? originalName.slice(0, dotIdx) : originalName
  );
  const timestamp = Date.now();
  const safeName = `${baseName}-${timestamp}${ext}`;

  const path = `public/images/${folder}/${safeName}`;
  const publicUrl = `/images/${folder}/${safeName}`;

  try {
    const result = await commitFiles(
      [{ path, content: base64, encoding: "base64" }],
      `chore(admin): upload image ${safeName}`
    );
    return NextResponse.json({
      success: true,
      url: publicUrl,
      commitSha: result.commitSha,
      commitUrl: result.commitUrl,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Échec de l'upload : ${message}` },
      { status: 500 }
    );
  }
}

