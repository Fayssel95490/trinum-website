type Attempt = { count: number; firstAt: number };

const attempts = new Map<string, Attempt>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function checkRateLimit(key: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const existing = attempts.get(key);

  if (!existing || now - existing.firstAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: now });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (existing.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: MAX_ATTEMPTS - existing.count };
}

export function resetRateLimit(key: string): void {
  attempts.delete(key);
}
