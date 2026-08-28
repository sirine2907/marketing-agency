/**
 * Subscriber storage.
 *
 * Backed by an in-process Map, which means it resets on every restart and is
 * not shared between serverless instances. That is fine for a demo and keeps
 * the repo free of credentials — swap the two functions below for real queries
 * (Postgres, Supabase, Turso...) and nothing upstream has to change.
 */

const store = new Map<string, { email: string; createdAt: string }>()

export async function hasSubscriber(email: string): Promise<boolean> {
  return store.has(email.toLowerCase())
}

export async function addSubscriber(email: string): Promise<void> {
  const key = email.toLowerCase()
  store.set(key, { email: key, createdAt: new Date().toISOString() })
}
