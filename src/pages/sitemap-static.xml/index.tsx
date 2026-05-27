import { GetServerSideProps } from "next";
import { buildSitemapUrlItem, buildUrlSetXml, SITE_URL } from "@/common/sitemap";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const lastmod = new Date().toISOString();
  const items = [
    buildSitemapUrlItem(`${SITE_URL}/`, "0.9", "daily", lastmod),
    buildSitemapUrlItem(`${SITE_URL}/maps`, "0.8", "daily", lastmod),
  ];

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildUrlSetXml(items));
  res.end();

  return { props: {} };
};

export default function StaticSitemap() {
  return null;
}
