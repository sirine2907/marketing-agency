import { NextResponse } from 'next/server'
import { rateLimit } from '../../../lib/rateLimit'
import { addSubscriber, hasSubscriber } from '../../../lib/subscribers'
import { validateEmail } from '../../../lib/validation'

function clientKey(request: Request): string {
  // Vercel and most proxies set these; fall back to a shared bucket locally.
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'local'
}

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request))

  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in a minute.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Expected a JSON body.' }, { status: 400 })
  }

  const email = (body as { email?: unknown })?.email
  const result = validateEmail(email)

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  try {
    if (await hasSubscriber(result.email)) {
      // Already-subscribed is not an error worth surfacing differently.
      return NextResponse.json({ message: 'You are already on the list.' }, { status: 200 })
    }

    await addSubscriber(result.email)
    return NextResponse.json({ message: 'Noted — talk soon.' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Could not save that right now.' }, { status: 500 })
  }
}
