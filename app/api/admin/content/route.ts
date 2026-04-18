import { NextResponse, type NextRequest } from "next/server";
import { readFile } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
} as const;

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
      { status: 400, headers: NO_CACHE_HEADERS }
    );
  }

  try {
    const content = await readFile(file);
    if (content === null) {
      return NextResponse.json(
        { error: "Fichier introuvable" },
        { status: 404, headers: NO_CACHE_HEADERS }
      );
    }
    return NextResponse.json(
      {
        success: true,
        file,
        content: JSON.parse(content),
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Échec lecture : ${message}` },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
