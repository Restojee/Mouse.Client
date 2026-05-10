const SITE_URL = "https://onlyplanks.ru";

export const DEFAULT_MAPS_SEO = {
  title: "Карты Transformice и прохождения",
  description:
    "OnlyPlanks - каталог карт Transformice с прохождениями, скриншотами, комментариями, заметками игроков и поиском по номеру карты.",
  keywords: [
    "transformice",
    "трансформайс",
    "прохождения карт",
    "карты transformice",
    "номер карты transformice",
    "maps",
    "onlyplanks",
    "палки",
    "мышки",
    "tfm",
  ],
};

type SeoInput = {
  code: string;
  authorName?: string | null;
  description?: string | null;
  tags?: string[] | null;
};

export const buildMapSeoTitle = ({ code, authorName }: SeoInput) => {
  const authorPart = authorName ? ` от ${authorName}` : "";
  return `Карта ${code} Transformice - прохождение${authorPart}`;
};

export const buildMapSeoDescription = ({ code, authorName, description, tags }: SeoInput) => {
  const authorPart = authorName ? ` от ${authorName}` : "";
  const tagsPart = tags?.length ? ` Теги: ${tags.join(", ")}.` : "";
  if (description) {
    return `Карта ${code} в Transformice${authorPart}: прохождение, скриншоты и заметки на OnlyPlanks. ${description}.${tagsPart}`;
  }
  return `Карта ${code} в Transformice${authorPart}: прохождение, скриншоты, комментарии игроков и заметки на OnlyPlanks.${tagsPart}`;
};

export const buildMapSeoKeywords = ({ code, authorName, tags }: SeoInput) => {
  const base = [
    "transformice",
    "трансформайс",
    "прохождение",
    "прохождение карты",
    "карты transformice",
    `карта ${code}`,
    `прохождение ${code}`,
    code,
    "onlyplanks",
    "tfm",
  ];
  if (authorName) base.push(authorName);
  if (tags?.length) base.push(...tags);
  return base;
};

export const buildMapSeoUrl = (levelId: number) => `${SITE_URL}/maps/${levelId}`;

export const buildAbsoluteSeoImageUrl = (image?: string | null) => {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};
