import type { SessionOptions } from "iron-session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface AdminSession {
  username?: string;
  loggedInAt?: number;
}

const FALLBACK_SECRET =
  "dev-only-changeme-changeme-changeme-changeme-changeme-changeme";

function resolveSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    return FALLBACK_SECRET;
  }
  return secret;
}

export const sessionOptions: SessionOptions = {
  password: resolveSecret(),
  cookieName: "trinum_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  },
};

export function assertProductionSecrets(): void {
  if (
    process.env.NODE_ENV === "production" &&
    (!process.env.SESSION_SECRET ||
      process.env.SESSION_SECRET.length < 32)
  ) {
    throw new Error(
      "SESSION_SECRET doit être défini (min 32 caractères) en production"
    );
  }
}

export async function getAdminSession() {
  const cookieStore = cookies();
  return getIronSession<AdminSession>(cookieStore, sessionOptions);
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return Boolean(session.username);
}
