# ISB Security Solutions — Corporate Website

Enterprise corporate website for ISB Security Solutions (Tilburg, The Netherlands).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Zod
- Resend (email delivery)
- Upstash Redis (rate limiting)

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | For form success | Resend API key |
| `CONTACT_FROM_EMAIL` | For form success | Verified sender (e.g. `noreply@…`) |
| `CONTACT_TO_EMAIL` | Recommended | Recipient (default `info@isbsecuritysolutions.nl`) |
| `UPSTASH_REDIS_REST_URL` | Production rate limit | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Production rate limit | Upstash Redis REST token |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site URL |

Never prefix secrets with `NEXT_PUBLIC_`.

## Scripts

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Forms

- `POST /api/contact` — Zod validation, honeypot, rate limit, Resend
- `POST /api/demo` — same pattern, expanded operational fields

**Without `RESEND_API_KEY`:** APIs return **HTTP 503**. The UI does **not** fake success.

**Rate limiting:** Upstash when configured (5 / 10 minutes per IP namespace: `contact:` / `demo:`). Without Upstash, an in-memory fallback is used for local development only and is **not** multi-instance safe.

## Claims policy

Platform under active development. No invented customers, certifications, awards or statistics. Feature status language: Implemented Foundation · Active Development · Planned · Future Direction.

## Routes

Public: `/` `/platform` `/features` `/solutions` `/industries` `/technology` `/security` `/ai` `/about` `/roadmap` `/faq` `/contact` `/request-demo` `/privacy` `/terms` `/cookies`

## Deployment checklist

1. Environment variables configured (no secrets in git)
2. Resend sender domain verified
3. Production recipient configured (`CONTACT_TO_EMAIL`)
4. Upstash configured for production rate limiting
5. `npm run lint` · `npm run typecheck` · `npm run build` succeed
6. Legal TODOs reviewed (retention, legal bases, liability)
7. Production domain + DNS configured
8. Contact and demo forms tested end-to-end
9. `/sitemap.xml`, `/robots.txt`, Open Graph image verified
10. Favicon and app icons valid

## Deploy (example: Vercel)

1. Import repository
2. Set environment variables from `.env.example`
3. Build command: `npm run build`
4. Output: Next.js default

## License

Proprietary. © ISB Security Solutions.
