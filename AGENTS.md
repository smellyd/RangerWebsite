# Production Search-Discovery Follow-up

After every successful production deployment, evaluate whether Google Search Console or Bing Webmaster Tools should be updated. Begin any necessary update immediately after validating the deployment.

Use these rules:

- If URLs were added, removed, renamed, redirected, or had canonical changes, resubmit `https://rangergasco.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- If important page content, titles, descriptions, structured data, or answer-focused content changed, request recrawling for the affected priority URLs where the platforms support it.
- For Bing, use the sitemap submission or IndexNow/URL submission workflow when appropriate.
- If a deployment changes only styling, images without URL changes, or implementation details that do not affect discoverable content, record that no search-platform update is needed.
- Confirm that the sitemap is accepted and report whether each platform shows success, processing, warnings, or errors.
- Never delay a completed production deployment while waiting for search engines to process a submission; processing can continue asynchronously.

