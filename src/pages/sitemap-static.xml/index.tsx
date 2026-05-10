import { GetServerSideProps } from "next";

const SITE_URL = "https://onlyplanks.ru";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildUrl = (loc: string, priority: string, changefreq: string, lastmod: string) => `
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const lastmod = new Date().toISOString();
  const items = [
    buildUrl(`${SITE_URL}/`, "0.9", "daily", lastmod),
    buildUrl(`${SITE_URL}/maps`, "0.8", "daily", lastmod),
  ].join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function StaticSitemap() {
  return null;
}
