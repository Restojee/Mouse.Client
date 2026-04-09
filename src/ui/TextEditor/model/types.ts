export type {
  TextFormat,
  TextNode,
  LinkNode,
  MentionNode,
  SpoilerNode,
  InlineNode,
  ParagraphNode,
  RootNode,
} from "../types";

import type { TextFormat, TextNode, InlineNode, ParagraphNode } from "../types";

export const emptyRoot = () => ({
  type: "root" as const,
  children: [{ type: "paragraph" as const, children: [] as InlineNode[] }],
});

export const textNode = (text: string, format?: TextFormat): TextNode => ({
  type: "text",
  text,
  ...(format && Object.keys(format).length > 0 ? { format } : {}),
});

export const paragraphNode = (children: InlineNode[] = []): ParagraphNode => ({
  type: "paragraph",
  children,
});
