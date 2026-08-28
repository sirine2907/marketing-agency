// Deliberately permissive: the only authority on whether an address exists is
// sending mail to it. This rejects the shapes that are definitely wrong.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const MAX_EMAIL_LENGTH = 254 // RFC 5321

export function validateEmail(value: unknown): { ok: true; email: string } | { ok: false; error: string } {
  if (typeof value !== 'string') {
    return { ok: false, error: 'Email must be a string.' }
  }

  const email = value.trim()

  if (!email) {
    return { ok: false, error: 'Email is required.' }
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    return { ok: false, error: 'That email address is too long.' }
  }

  if (!EMAIL.test(email)) {
    return { ok: false, error: 'That does not look like a valid email address.' }
  }

  return { ok: true, email }
}
