---
name: Newsletter reuses contact endpoint
description: Why the newsletter signup posts to /api/contact instead of its own backend
---
The homepage newsletter signup (Newsletter.tsx) intentionally POSTs to the existing
`/api/contact` endpoint with `inquiryType: "Newsletter Signup"`, name "Newsletter
Subscriber", and a synthesized message — instead of having its own table/route/zod/client.

**Why:** Adding a real backend would require the full orval codegen pipeline (db schema →
OpenAPI spec → api-zod → api-client-react regen) for a single email field. Reusing the
already-working contact flow makes the signup genuinely functional (persists to
contactSubmissionsTable, shows in /admin, triggers the Gmail notification) with zero new
infra and no dead button.

**How to apply:** If newsletter signups ever need to be separated from contact inquiries
(e.g. a dedicated subscriber list or unsubscribe flow), that's the trigger to build a real
endpoint. Until then, filter by inquiryType === "Newsletter Signup" in admin/exports.
