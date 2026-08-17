# Ranger Gas Co. Website

Fresh static baseline for [rangergasco.com](https://rangergasco.com/).

## Local Preview

Open `index.html` directly in a browser, or run a local static server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Structure

- `index.html` - homepage content
- `medical-gas-delivery/`, `restaurant-co2-delivery/`, `veterinary-medical-gases/`, `belmed-equipment/`, and `service-areas/` - service and location pages
- `css/site.css` - project-specific styles and Bootstrap overrides
- `js/site.js` - mobile navigation behavior
- `assets/` - logos, favicon, and images
- `sitemap.xml` and `robots.txt` - search-engine discovery files

## Production Search-Discovery Check

After every successful production deployment:

1. Validate the live URLs and deployment output.
2. Check whether routes, canonical URLs, sitemap entries, important content, metadata, or structured data changed.
3. If they did, immediately update Google Search Console and Bing Webmaster Tools using sitemap submission, URL inspection, or Bing URL submission/IndexNow as appropriate.
4. If the update was purely visual or otherwise did not affect discoverable content, document that no search-platform action was required.
5. Verify and report each platform's acceptance, processing state, warnings, or errors.
