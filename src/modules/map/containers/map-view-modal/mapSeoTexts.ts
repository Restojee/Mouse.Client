const SITE_URL = "https://onlyplanks.ru";

export const DEFAULT_MAPS_SEO = {
  title: "Карты Transformice",
  description:
    "Карты и прохождения для игры Transformice: карты сообщества, скриншоты прохождений, комментарии и заметки игроков.",
  keywords: ["transformice", "трансформайс", "прохождения", "maps", "onlyplanks", "карты", "палки", "мышки", "tfm"],
};

type SeoInput = {
  code: string;
  authorName?: string | null;
  description?: string | null;
  tags?: string[] | null;
};

export const buildMapSeoTitle = ({ code, authorName }: SeoInput) => {
  const authorPart = authorName ? ` от ${authorName}` : "";
  return `Прохождение карты ${code}${authorPart}`;
};

export const buildMapSeoDescription = ({ code, authorName, description, tags }: SeoInput) => {
  const authorPart = authorName ? ` от ${authorName}` : "";
  const tagsPart = tags?.length ? ` Теги: ${tags.join(", ")}.` : "";
  if (description) {
    return `Прохождение карты ${code} в Transformice${authorPart}: ${description}.${tagsPart}`;
  }
  return `Прохождение карты ${code} в Transformice${authorPart} — скриншоты, комментарии игроков и заметки.${tagsPart}`;
};

export const buildMapSeoKeywords = ({ code, authorName, tags }: SeoInput) => {
  const base = ["transformice", "трансформайс", "прохождение", "карты", `карта ${code}`, code, "onlyplanks", "tfm"];
  if (authorName) base.push(authorName);
  if (tags?.length) base.push(...tags);
  return base;
};

export const buildMapSeoUrl = (levelId: number) => `${SITE_URL}/maps/${levelId}`;
