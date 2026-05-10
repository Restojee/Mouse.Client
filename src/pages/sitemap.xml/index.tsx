import { mapsApi } from "@/api/mapsApi";
import { GetServerSideProps } from "next";

const SITE_URL = "https://onlyplanks.ru";
const PAGE_SIZE = 50;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildSitemapItem = (loc: string, lastmod: string) =>
  `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${escapeXml(lastmod)}</lastmod>\n  </sitemap>`;

const buildIndex = (sitemapCount: number, lastmod: string) => {
  const staticSitemap = buildSitemapItem(`${SITE_URL}/sitemap-static.xml`, lastmod);
  const mapSitemaps = Array.from({ length: sitemapCount }, (_, i) =>
    buildSitemapItem(`${SITE_URL}/sitemap-maps/${i + 1}.xml`, lastmod),
  ).join("\n");
  const items = [staticSitemap, mapSitemaps].filter(Boolean).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let sitemapCount = 1;
  try {
    const probe = await mapsApi.getMaps({ page: 1, size: 1, sortBy: "DATE", sortDirection: "DESC" });
    const totalItems = probe?.totalItems ?? 0;
    sitemapCount = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  } catch {
    sitemapCount = 1;
  }

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildIndex(sitemapCount, new Date().toISOString()));
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
