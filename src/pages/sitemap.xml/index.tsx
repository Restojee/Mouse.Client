import { mapsApi } from "@/api/mapsApi";
import { buildSitemapIndexItem, buildSitemapIndexXml, MAP_SITEMAP_PAGE_SIZE, SITE_URL } from "@/common/sitemap";
import { GetServerSideProps } from "next";

const buildIndex = (sitemapCount: number, lastmod: string) => {
  const staticSitemap = buildSitemapIndexItem(`${SITE_URL}/sitemap-static.xml`, lastmod);
  const mapSitemaps = Array.from({ length: sitemapCount }, (_, i) =>
    buildSitemapIndexItem(`${SITE_URL}/sitemap-maps/${i + 1}.xml`, lastmod),
  ).join("\n");

  return buildSitemapIndexXml([staticSitemap, mapSitemaps]);
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let sitemapCount = 1;
  try {
    const probe = await mapsApi.getMaps({
      page: 1,
      size: MAP_SITEMAP_PAGE_SIZE,
      sortBy: "DATE",
      sortDirection: "DESC",
    });
    const totalItems = probe?.totalItems ?? 0;
    const totalPages = probe?.totalPages ?? 0;
    sitemapCount = Math.max(1, totalPages || Math.ceil(totalItems / MAP_SITEMAP_PAGE_SIZE));
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
