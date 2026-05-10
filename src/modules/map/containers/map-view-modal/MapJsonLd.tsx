import Head from "next/head";

type MapJsonLdProps = {
  id: number;
  code: string;
  description: string;
  image?: string;
  url: string;
  authorName?: string | null;
  tags?: string[] | null;
  createdUtcDate?: string | null;
  modifiedUtcDate?: string | null;
  commentsCount?: number;
  completedCount?: number;
  favoritesCount?: number;
  visitsCount?: number;
};

export const MapJsonLd = ({
  id,
  code,
  description,
  image,
  url,
  authorName,
  tags,
  createdUtcDate,
  modifiedUtcDate,
  commentsCount,
  completedCount,
  favoritesCount,
  visitsCount,
}: MapJsonLdProps) => {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `Карта ${code} Transformice`,
    description,
    identifier: code,
    url,
    mainEntityOfPage: url,
    inLanguage: "ru-RU",
    isPartOf: {
      "@type": "WebSite",
      name: "OnlyPlanks",
      url: "https://onlyplanks.ru",
    },
    about: {
      "@type": "VideoGame",
      name: "Transformice",
    },
    position: id,
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

  if (createdUtcDate) {
    jsonLd.dateCreated = createdUtcDate;
  }

  if (modifiedUtcDate) {
    jsonLd.dateModified = modifiedUtcDate;
  }

  const interactionStatistic = [
    commentsCount
      ? {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/CommentAction",
          userInteractionCount: commentsCount,
        }
      : null,
    completedCount
      ? {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/CompleteAction",
          userInteractionCount: completedCount,
        }
      : null,
    favoritesCount
      ? {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/LikeAction",
          userInteractionCount: favoritesCount,
        }
      : null,
    visitsCount
      ? {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/ViewAction",
          userInteractionCount: visitsCount,
        }
      : null,
  ].filter(Boolean);

  if (interactionStatistic.length) {
    jsonLd.interactionStatistic = interactionStatistic;
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
