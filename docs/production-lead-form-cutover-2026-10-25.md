# Prepared production lead form cutover

This document records the pre-cutover baseline, release checks, and rollback. Before cutover, the production site used the Intuit embed in `index.html` at `#cta`. The change replaces that embed with `https://app.rangergasco.com/lead-form`, a standalone link, and existing-customer phone guidance. The surrounding homepage and service pages are unchanged.

## Source and deployment

- Repository: `https://github.com/smellyd/RangerWebsite.git`; custom domain in `CNAME`: `rangergasco.com`.
- `.github/workflows/static.yml` deploys the repository root to GitHub Pages on a push to `main` or manual `workflow_dispatch`. Production intake must pass end-to-end verification before this change reaches `main`.
- Pre-cutover baseline: `f7b7290` (`Align homepage service card copy`). The original form uses Intuit account `254759799`, form `344365`. Keep that legacy endpoint active for browsers with the old page open.
- Prepared candidate source was supplied in the Ranger App snapshot at `/Users/dereksmelser/Documents/ChatGPT/Ranger App/web/production-cutover/2026-10-25/`; this branch applies its `#cta` replacement and retains the existing shell styling.

## Release gate

1. Verify production `https://app.rangergasco.com/lead-form` opens and accepts a clearly synthetic request using the real Turnstile widget. Confirm durable receipt, production app visibility, notification, address data, and retry behavior. Confirm employees can monitor incoming requests.
2. Preview this branch on desktop and mobile. Check iframe frame permissions, full form height, submit control, standalone link, phone link, and narrow viewport layout. The `1900` pixel iframe height is provisional.
3. Confirm `main` and the live site still match the baseline before merge; review any concurrent edits. Run `node --test tests/navigation.test.cjs` and inspect the final diff.
4. Merge only after the gate passes, then verify apex and `www` live URLs and repeat a website-to-production synthetic submission.

## Rollback and discovery

If website intake fails, restore the pre-cutover `#cta` fragment from commit `f7b7290` and deploy that reversal to `main`. Preserve accepted new leads and reconcile them against legacy Intuit receipts. Do not shut off the new intake until the old website is restored and already-open form tabs are considered.

This change affects a contact form and customer guidance on the homepage, with no URL, canonical, or sitemap changes. After a successful deployment, evaluate Search Console and Bing under `AGENTS.md`; request recrawling of the homepage if the guidance is considered important discoverable content. A sitemap resubmission is not triggered by this branch alone.
