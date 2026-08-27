import Link from 'next/link'

export const metadata = {
  title: 'Lost signal — 404',
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" aria-hidden="true" />

      <div className="wrap relative">
        <span className="eyebrow">Error — 404</span>

        <h1 className="display-1 mt-8 text-paper">
          Lost
          <br />
          <span className="text-acid">signal</span>
        </h1>

        <p className="lede mt-10 max-w-md">
          That page does not exist, moved, or never did. Nothing personal.
        </p>

        <Link href="/" className="btn-acid mt-12">
          Back to safety
        </Link>
      </div>
    </main>
  )
}
