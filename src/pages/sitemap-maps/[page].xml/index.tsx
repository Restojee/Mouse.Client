import { GetServerSideProps } from "next";
import { mapsApi } from "@/api/mapsApi";
import type { Map } from "@/api/codegen/genMouseMapsApi";

const SITE_URL = "https://onlyplanks.ru";
const PAGE_SIZE = 50;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const raw = params?.page;
  const page = Number(Array.isArray(raw) ? raw[0] : raw);

  if (!page || page < 1 || Number.isNaN(page)) {
    return { notFound: true };
  }

  let maps: Map[] = [];
  let totalPages = 0;

  try {
    const data = await mapsApi.getMaps({
      page,
      size: PAGE_SIZE,
      sortBy: "DATE",
      sortDirection: "DESC",
    });

    maps = data?.records ?? [];

    const total = data?.totalItems ?? 0;
    totalPages = Math.ceil(total / PAGE_SIZE);
  } catch {
    return { notFound: true };
  }

  if (page > totalPages || maps.length === 0) {
    return { notFound: true };
  }

  const items = maps
    .filter((map) => typeof map.id === "number")
    .map((map) => {
      const loc = escapeXml(`${SITE_URL}/maps/${map.id}`);
      const lastmod = escapeXml(map.modifiedUtcDate ?? map.createdUtcDate ?? new Date().toISOString());
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("");

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

export default function SitemapPage() {
  return null;
}
