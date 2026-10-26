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

## Production result — October 25, 2026 (Eastern)

- Form release commit: `0f3771f91d51d38eea4025be3e0f24d483ecbd64` on `main`. GitHub Pages [run 40266111156](https://github.com/smellyd/RangerWebsite/actions/runs/40266111156) completed successfully.
- `https://rangergasco.com/` returned the new iframe and standalone link; the active Intuit embed was absent. `https://www.rangergasco.com/` redirected to the apex URL. The independent Ranger App verification opened the live homepage iframe, submitted the synthetic lead `SYNTHETIC Live Website Embed Oct25`, and confirmed production D1 receipt `799a1452-cc83-4be5-b03d-b4492006781a` with its structured address. Derek confirmed that the lead and notification both arrived. Evidence screenshot: `/Users/dereksmelser/Documents/ChatGPT/Ranger App/docs/verification/production-intake-2026-10-25/live-website.png`.
- Local navigation tests: 13 passed. The Intuit endpoint was left active for previously opened pages. The Ranger App team owns legacy/new receipt reconciliation during the transition.
- Search discovery: the visible homepage request guidance and outbound form link changed, so homepage recrawling is appropriate. No URL, canonical, or sitemap entry changed, so a sitemap resubmission is not required. Google Search Console was open under `dereksmelser@gmail.com` but showed no site property; Bing Webmaster Tools was signed out. No submission could be made or acceptance status confirmed from those sessions. Submit the homepage URL when property access is available; Bing URL submission is the appropriate path there.

## Responsive form correction — October 26, 2026 (Eastern)

- The website wrapper was widened from 860px to 1200px in commit `377eb91262fea8016d31788f8d99a0714e7ae1c0`. GitHub Pages [run 40321916042](https://github.com/smellyd/RangerWebsite/actions/runs/40321916042) completed successfully, and the live stylesheet returned `max-width: 1200px` for `.ranger-lead-form-shell`.
- This website deployment changes styling only and has no URL or discoverable content change. No Google Search Console or Bing update is needed for this correction.
- The embedded form's own responsive grid is maintained by the Ranger App production Worker; that fix and viewport verification are tracked in the Ranger App project.
- A 320px screen initially left only 222px for the iframe because of website padding. Commit `529ba72732a9245f9b4b757dbbcac8063bf61ed1` gives the form full width at phone sizes; GitHub Pages [run 40322555127](https://github.com/smellyd/RangerWebsite/actions/runs/40322555127) succeeded. Commit `4129faf749337f05e0b1b1bfe6329fd5949d3767` refreshed the homepage stylesheet URL so existing browsers load that CSS; [run 40322805172](https://github.com/smellyd/RangerWebsite/actions/runs/40322805172) succeeded.
- Final form Worker version: `7fa9a786-1dd1-4239-8a83-7bdb7750b5ca`. After a fresh homepage reload, live outer viewport widths 320, 375, 768, 810, 1024, and 1440px produced iframe widths 320, 375, 622, 622, 862, and 1150px. At every width the first and last name fields were equal, no horizontal overflow was found, and the submit button fit. The production security check completed and enabled submission. Evidence: `/Users/dereksmelser/Documents/ChatGPT/Ranger App/docs/verification/form-responsive-2026-10-26/live-fixed.png` and `/Users/dereksmelser/Documents/ChatGPT/Ranger App/docs/testing/form-responsive-2026-10-26.md`. No additional production request was submitted for this visual correction.
- The mobile wrapper and stylesheet refresh are styling and asset-version changes only. Neither changes URLs, canonicals, or discoverable content, so no new Google Search Console or Bing action is needed. The original homepage recrawl access gap above remains open.
