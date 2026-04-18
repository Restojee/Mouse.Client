import Head from "next/head";

type MapJsonLdProps = {
  code: string;
  description: string;
  image?: string;
  url: string;
  authorName?: string | null;
  tags?: string[] | null;
};

export const MapJsonLd = ({ code, description, image, url, authorName, tags }: MapJsonLdProps) => {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `Карта ${code}`,
    description,
    url,
  };

  if (image) {
    jsonLd.image = image;
  }

  if (authorName) {
    jsonLd.author = {
      "@type": "Person",
      name: authorName,
    };
  }

  if (tags?.length) {
    jsonLd.keywords = tags.join(", ");
  }

  return (
    <Head>
      <script
        key={"map-json-ld"}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};
