const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL, fileURLToPath } = require('node:url');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const origin = 'https://rangergasco.com';
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const canonicalUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const script = fs.readFileSync(path.join(root, 'js/site.js'), 'utf8');

function runNavigation(hrefs, base) {
  const links = hrefs.map(href => ({
    href,
    getAttribute: () => href,
  }));
  vm.runInNewContext(script, {
    URL,
    window: { location: new URL(base) },
    document: {
      querySelectorAll: selector => selector === 'a[href]' ? links : [],
    },
  });
  return links.map(link => link.href);
}

for (const canonical of canonicalUrls) {
  const relativeFile = new URL(canonical).pathname.slice(1) + 'index.html';
  const sourceFile = path.join(root, relativeFile);
  const html = fs.readFileSync(sourceFile, 'utf8');
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/g)].map(m => m[1]);

  test(`${relativeFile}: canonical, metadata and HTTP links`, () => {
    assert.deepEqual([...html.matchAll(/rel="canonical" href="([^"]+)"/g)].map(m => m[1]), [canonical]);
    assert.ok(!/noindex/i.test(html));
    assert.match(html, /js\/site\.js\?v=20260831/);
    for (const base of [canonical, canonical + 'index.html']) {
      assert.deepEqual(runNavigation(hrefs, base), hrefs);
      for (const href of hrefs) {
        const target = new URL(href, base);
        if (target.origin !== origin) continue;
        if (href.startsWith('#')) continue;
        assert.ok(canonicalUrls.includes(target.origin + target.pathname), href);
        if (target.hash) {
          const targetHtml = fs.readFileSync(path.join(root, target.pathname.slice(1), 'index.html'), 'utf8');
          assert.ok(targetHtml.includes(`id="${target.hash.slice(1)}"`), href);
        }
      }
    }
  });

  test(`${relativeFile}: local previews resolve to files, not directories`, () => {
    const base = pathToFileURL(sourceFile).href;
    const rewritten = runNavigation(hrefs, base);
    hrefs.forEach((href, i) => {
      const target = new URL(rewritten[i], base);
      if (target.protocol !== 'file:') return assert.equal(rewritten[i], href);
      assert.ok(target.pathname.endsWith('/index.html'), rewritten[i]);
      assert.ok(fs.statSync(fileURLToPath(target)).isFile(), rewritten[i]);
      assert.equal(target.hash, new URL(href, base).hash);
    });
  });
}

test('file-preview adapter preserves query strings, fragments and external links', () => {
  const base = 'file:///tmp/RGC%20Website/index.html';
  const hrefs = ['medical-gas-delivery/?source=test#details', '#aboutUs', 'https://belmedinc.com/products/', 'mailto:support@rangergasco.com', 'tel:+18645287979'];
  const actual = runNavigation(hrefs, base);
  assert.equal(actual[0], 'file:///tmp/RGC%20Website/medical-gas-delivery/index.html?source=test#details');
  assert.deepEqual(actual.slice(1), hrefs.slice(1));
});
