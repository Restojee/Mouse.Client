import { GetServerSideProps } from "next";
import { mapsApi } from "@/api/mapsApi";
import type { Map } from "@/api/codegen/genMouseMapsApi";
import { buildSitemapUrlItem, buildUrlSetXml, getMapPageUrl, MAP_SITEMAP_PAGE_SIZE } from "@/common/sitemap";

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
      size: MAP_SITEMAP_PAGE_SIZE,
      sortBy: "DATE",
      sortDirection: "DESC",
    });

    maps = data?.records ?? [];

    const total = data?.totalItems ?? 0;
    totalPages = data?.totalPages ?? Math.ceil(total / MAP_SITEMAP_PAGE_SIZE);
  } catch {
    return { notFound: true };
  }

  if (maps.length === 0 || (totalPages > 0 && page > totalPages)) {
    return { notFound: true };
  }

  const items = maps
    .filter((map) => typeof map.id === "number")
    .map((map) => {
      const loc = getMapPageUrl(map.id as number);
      const lastmod = map.modifiedUtcDate ?? map.createdUtcDate ?? new Date().toISOString();

      return buildSitemapUrlItem(loc, "0.7", "weekly", lastmod);
    });

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildUrlSetXml(items));
  res.end();

  return { props: {} };
};

export default function SitemapPage() {
  return null;
}
