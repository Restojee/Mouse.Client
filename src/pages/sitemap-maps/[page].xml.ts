import { GetServerSideProps } from "next";

const SITE_URL = "https://onlyplanks.ru";

const TOTAL_PAGES = 50; // ← поменяй под себя

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const buildSitemapIndex = () => {
    const items = Array.from({ length: TOTAL_PAGES })
      .map((_, i) => {
        const page = i + 1;
        return `
  <sitemap>
    <loc>${SITE_URL}/sitemap/${page}</loc>
  </sitemap>`;
      })
      .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>`;
  };

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(buildSitemapIndex());
  res.end();

  return { props: {} };
};

export default function SitemapIndex() {
  return null;
}
