# SIGNAL®

A dark brutalist landing page for a fictional creative and performance marketing
studio. Built as a hands-on way into modern React and Next.js.

> Started life as a cloned Next.js template and was rebuilt section by section —
> new brand, new design system, new components, new copy.

## Stack

| Concern    | Choice                          |
| ---------- | ------------------------------- |
| Framework  | Next.js 15 (App Router)         |
| Language   | TypeScript 5                    |
| UI         | React 19                        |
| Styling    | Tailwind CSS 3.4                |
| Motion     | Framer Motion 12                |
| Icons      | Lucide React                    |
| Fonts      | Archivo Black / Inter / IBM Plex Mono |

## Running it

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Script          | Does                                  |
| --------------- | ------------------------------------- |
| `npm run dev`   | Dev server with hot reload            |
| `npm run build` | Production build                        |
| `npm start`     | Serve a production build              |
| `npm run lint`  | ESLint                                |
| `npm test`      | Run the test suite once               |
| `npm run test:watch` | Tests in watch mode              |

If the build dies with `memory allocation ... failed`, the machine is short on
RAM rather than the code being wrong. Cap the heap and retry:

```bash
NODE_OPTIONS="--max-old-space-size=2048" npm run build
```

## Design system

Everything is driven by tokens in `tailwind.config.js` and component classes in
`src/app/globals.css`.

| Token     | Value     | Used for                   |
| --------- | --------- | -------------------------- |
| `ink`     | `#0A0A0A` | Page background            |
| `surface` | `#141414` | Alternating section bands  |
| `paper`   | `#FAFAFA` | Primary text               |
| `muted`   | `#8A8A8A` | Secondary text             |
| `line`    | `#2A2A2A` | Hairline borders           |
| `acid`    | `#D0FF14` | The single accent          |

House rules the whole page follows:

- **No border radius.** The scale is overridden to `0`.
- **No blur.** No glassmorphism, no soft glows — hard offset shadows instead.
- **One accent.** Acid lime, used sparingly enough to still mean something.
- **Structure is visible.** Hairline borders and grid lines do the layout work.
- **Motion is mechanical.** Short durations, sharp easing, no floaty springs.
- `prefers-reduced-motion` is respected globally.

## Layout

```
src/
├── app/
│   ├── globals.css        design tokens and component classes
│   ├── layout.tsx         fonts, metadata, root shell
│   ├── not-found.tsx      404
│   └── page.tsx           composes the sections
└── components/
    ├── Navigation.tsx     fixed nav, scroll progress, mobile sheet
    ├── HeroSection.tsx    headline, stats, service ticker
    ├── ServicesSection.tsx six-cell service grid
    ├── WorkSection.tsx    case studies as an index table
    ├── ProcessSection.tsx four stages plus studio facts
    ├── TestimonialsSection.tsx quote carousel and client marquee
    └── Footer.tsx         contact slab and footer
```

## Notes

- The newsletter form posts to `POST /api/subscribe`, a route handler that
  validates the address server-side, rate-limits by IP and returns proper status
  codes (`201`, `400`, `429`, `500`).
- Subscribers are held in an in-process `Map`, so they reset on restart. Swap the
  two functions in `src/lib/subscribers.ts` for real queries and nothing else has
  to change.
- Because there is now a server route, this is no longer a static export — it
  needs a Node host (Vercel, Netlify, Fly). `npm run build` no longer writes `out/`.
- Set `NEXT_PUBLIC_SITE_URL` on the host so canonical URLs and the sitemap point
  at the real domain.
- All names, metrics, testimonials and case studies are invented.

## License

MIT
