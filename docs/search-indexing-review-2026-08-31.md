# Search indexing review — August 31, 2026

## Finding

Reviewed the signed-in Google Search Console property for
`https://rangergasco.com/`. Its Page indexing report lists all six intended
canonical pages as indexed: the homepage, medical gas delivery, restaurant CO2
delivery, veterinary medical gases, Belmed equipment, and service areas.

The two examples under **Alternate page with proper canonical tag** are:

- `https://rangergasco.com/index.html`
- `https://rangergasco.com/medical-gas-delivery/index.html`

These are intentional duplicates, not missing service pages. Their canonical
targets are respectively `/` and `/medical-gas-delivery/`, both present in the
indexed-pages report. The report is Google's latest displayed snapshot, not a
guarantee of future index status.

Google's submitted `/sitemap.xml` shows **Success**, six discovered pages,
and a last-read date of August 25, 2026.

## Live validation

All six directory URLs and their six `index.html` equivalents returned HTTP
200. Each pair had identical HTML, a single correct canonical tag, and no
`noindex` directive in its HTML. The sitemap lists only the six canonical
directory URLs, and robots.txt permits crawling.

## Preventive cleanup

Internal HTML links now use directory URLs matching the sitemap and canonical
tags. The shared script converts local directory links to `index.html` only
when previewing under `file://`, preserving direct-file previews without
rewriting published links. All six pages reference the updated script version.

Thirteen automated tests cover canonical tags, internal HTTP links, fragment
targets, file-preview navigation, and preservation of external links and queries.
At the time of this review, the cleanup had not yet been deployed; the live
checks above reviewed the production version before the cleanup.

## Search-platform handling

- Keep the canonical tags and the existing sitemap URLs.
- Do not request indexing of the duplicate `index.html` addresses.
- Do not use “Validate fix” to remove an intentional alternate-page status.
- Link cleanup alone does not add, remove, redirect, or recanonicalize any page.
  A sitemap resubmission is not required for this change. Evaluate any additional
  changes separately under AGENTS.md when deploying.
- This status can remain after the cleanup: GitHub Pages still serves both URL
  forms and Google correctly consolidates them. Removing it is not the goal;
  indexing the six intended canonical pages is.

References:

- [Google Page indexing report guidance](https://support.google.com/webmasters/answer/7440203?hl=en)
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
