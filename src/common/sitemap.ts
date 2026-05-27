export const SITE_URL = "https://onlyplanks.ru";
export const MAP_SITEMAP_PAGE_SIZE = 50;

export const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const buildSitemapIndexItem = (loc: string, lastmod: string) =>
  `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
  </sitemap>`;

export const buildSitemapUrlItem = (loc: string, priority: string, changefreq: string, lastmod: string) => `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

export const buildSitemapIndexXml = (items: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.filter(Boolean).join("\n")}
</sitemapindex>`;

export const buildUrlSetXml = (items: string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.join("")}
</urlset>`;

export const getMapPageUrl = (levelId: number) => `${SITE_URL}/maps/${levelId}`;
