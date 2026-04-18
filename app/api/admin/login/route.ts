import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminSession, assertProductionSecrets } from "@/lib/auth";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  assertProductionSecrets();

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rate = checkRateLimit(`login:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error:
          "Trop de tentatives. Réessayez dans 15 minutes.",
      },
      { status: 429 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json(
      { error: "Identifiants requis" },
      { status: 400 }
    );
  }

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedHash) {
    return NextResponse.json(
      {
        error:
          "Configuration serveur manquante (ADMIN_USERNAME / ADMIN_PASSWORD_HASH)",
      },
      { status: 500 }
    );
  }

  const usernameMatches = username === expectedUsername;
  const passwordMatches = usernameMatches
    ? await bcrypt.compare(password, expectedHash)
    : false;

  if (!usernameMatches || !passwordMatches) {
    return NextResponse.json(
      { error: "Identifiants incorrects" },
      { status: 401 }
    );
  }

  resetRateLimit(`login:${ip}`);

  const session = await getAdminSession();
  session.username = username;
  session.loggedInAt = Date.now();
  await session.save();

  return NextResponse.json({ success: true });
}
