import type { InlineNode, ParagraphNode, RootNode, TextNode } from "./types";
import { emptyRoot, paragraphNode, textNode } from "./types";

type InlinePattern = {
  re: RegExp;
  parse: (match: RegExpExecArray, parseInner: (s: string) => InlineNode[]) => InlineNode;
};

const INLINE_PATTERNS: InlinePattern[] = [
  //  [spoiler]...[/spoiler]
  {
    re: /\[spoiler\]([\s\S]*?)\[\/spoiler\]/i,
    parse: (m, inner) => ({
      type: "spoiler",
      children: inner(m[1]).filter((n): n is TextNode => n.type === "text"),
    }),
  },
  //  [url=...]...[/url]
  {
    re: /\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/i,
    parse: (m) => ({ type: "link", url: m[1], children: [textNode(m[2] || m[1])] }),
  },
  // url
  {
    re: /https?:\/\/[^\s\\[\]]+/,
    parse: (m) => ({ type: "link", url: m[0], children: [textNode(m[0])] }),
  },
  //  [b]...[/b]
  {
    re: /\[b\]([\s\S]*?)\[\/b\]/i,
    parse: (m) => textNode(m[1], { bold: true }),
  },
  //  [i]...[/i]
  {
    re: /\[i\]([\s\S]*?)\[\/i\]/i,
    parse: (m) => textNode(m[1], { italic: true }),
  },
  //  [u]...[/u]
  {
    re: /\[u\]([\s\S]*?)\[\/u\]/i,
    parse: (m) => textNode(m[1], { underline: true }),
  },
  // valid usernames
  {
    re: /@([\w\-а-яА-ЯёЁ]+)/,
    parse: (m) => ({ type: "mention", username: m[1] }),
  },
];

const parseInline = (text: string): InlineNode[] => {
  if (!text) return [];

  let bestIndex = Infinity;
  let bestPattern: InlinePattern | null = null;
  let bestMatch: RegExpExecArray | null = null;

  for (const pattern of INLINE_PATTERNS) {
    const m = pattern.re.exec(text);
    if (m && m.index < bestIndex) {
      bestIndex = m.index;
      bestPattern = pattern;
      bestMatch = m;
    }
  }

  if (!bestPattern || !bestMatch) return [textNode(text)];

  const nodes: InlineNode[] = [];
  if (bestIndex > 0) nodes.push(textNode(text.slice(0, bestIndex)));
  nodes.push(bestPattern.parse(bestMatch, parseInline));
  const after = text.slice(bestIndex + bestMatch[0].length);
  if (after) nodes.push(...parseInline(after));

  return nodes;
};

const filterMentions = (nodes: InlineNode[], validUsernames: Set<string>): InlineNode[] =>
  nodes.map((n) => {
    if (n.type === "mention" && !validUsernames.has(n.username)) {
      return textNode(`@${n.username}`);
    }
    return n;
  });

export const parseText = (text: string, validUsernames?: Set<string>): RootNode => {
  if (!text.trim()) return emptyRoot();
  const children: ParagraphNode[] = text.split("\n").map((line) => {
    const nodes = parseInline(line);
    return paragraphNode(validUsernames ? filterMentions(nodes, validUsernames) : nodes);
  });
  return { type: "root", children };
};
