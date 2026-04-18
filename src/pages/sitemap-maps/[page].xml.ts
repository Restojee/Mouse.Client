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

const buildUrlset = (ids: number[]) => {
  const items = ids
    .map((id) => {
      const loc = escapeXml(`${SITE_URL}/maps/${id}`);
      return `  <url>\n    <loc>${loc}</loc>\n    <priority>0.7</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const raw = params?.page;
  const page = Number(Array.isArray(raw) ? raw[0] : raw);

  if (!page || Number.isNaN(page) || page < 1) {
    return { notFound: true };
  }

  let ids: number[] = [];
  try {
    const data = await mapsApi.getMaps({ page, size: PAGE_SIZE, sortBy: "DATE", sortDirection: "DESC" });
    ids = (data?.records ?? []).map((m) => m.id).filter((id): id is number => typeof id === "number");
  } catch {
    ids = [];
  }

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildUrlset(ids));
  res.end();

  return { props: {} };
};

export default function SitemapMaps() {
  return null;
}
