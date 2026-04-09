import type { Decoration, Segment } from "../types";

export const buildSegments = (text: string, decorations: Decoration[]): Segment[] => {
  if (decorations.length === 0) return [{ text, type: null }];

  const sorted = [...decorations].sort((a, b) => (a.start !== b.start ? a.start - b.start : b.end - a.end));
  const segments: Segment[] = [];
  let cursor = 0;

  for (const dec of sorted) {
    const start = Math.max(dec.start, cursor);
    const end = Math.min(dec.end, text.length);
    if (start >= end) continue;
    if (start > cursor) segments.push({ text: text.slice(cursor, start), type: null });
    segments.push({ text: text.slice(start, end), type: dec.type, style: dec.style, data: dec.data });
    cursor = end;
  }

  if (cursor < text.length) segments.push({ text: text.slice(cursor), type: null });
  return segments;
};
