import Head from "next/head";

export type MetaTagsProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  viewport?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
};

const SITE_NAME = "OnlyPlanks";
const SITE_URL = "https://onlyplanks.ru";
const DEFAULT_IMAGE = `${SITE_URL}/images/default-map-image.jpg`;

const getAbsoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};

export const MetaTags = ({
  title,
  description,
  keywords,
  viewport,
  image,
  url,
  type = "website",
  noIndex,
}: MetaTagsProps) => {
  const fullTitle = title ? `${title} • ${SITE_NAME}` : SITE_NAME;
  const ogImage = image ? getAbsoluteUrl(image) : DEFAULT_IMAGE;
  const canonical = url ? getAbsoluteUrl(url) : SITE_URL;

  return (
    <Head>
      <title key={"title"}>{fullTitle}</title>
      {description ? (
        <meta
          key={"description"}
          name="description"
          content={description}
        />
      ) : null}
      {keywords?.length ? (
        <meta
          key={"keywords"}
          name="keywords"
          content={keywords.join(", ")}
        />
      ) : null}
      {viewport ? (
        <meta
          key={"viewport"}
          name="viewport"
          content={viewport}
        />
      ) : null}
      <meta
        key={"robots"}
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />
      <meta
        key={"googlebot"}
        name="googlebot"
        content={
          noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />
      <link
        key={"canonical"}
        rel="canonical"
        href={canonical}
      />

      <meta
        key={"og:site_name"}
        property="og:site_name"
        content={SITE_NAME}
      />
      <meta
        key={"og:locale"}
        property="og:locale"
        content="ru_RU"
      />
      <meta
        key={"og:type"}
        property="og:type"
        content={type}
      />
      <meta
        key={"og:title"}
        property="og:title"
        content={fullTitle}
      />
      {description ? (
        <meta
          key={"og:description"}
          property="og:description"
          content={description}
        />
      ) : null}
      <meta
        key={"og:url"}
        property="og:url"
        content={canonical}
      />
      <meta
        key={"og:image"}
        property="og:image"
        content={ogImage}
      />
      <meta
        key={"og:image:alt"}
        property="og:image:alt"
        content={title ?? SITE_NAME}
      />

      <meta
        key={"twitter:card"}
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key={"twitter:title"}
        name="twitter:title"
        content={fullTitle}
      />
      {description ? (
        <meta
          key={"twitter:description"}
          name="twitter:description"
          content={description}
        />
      ) : null}
      <meta
        key={"twitter:image"}
        name="twitter:image"
        content={ogImage}
      />
    </Head>
  );
};
