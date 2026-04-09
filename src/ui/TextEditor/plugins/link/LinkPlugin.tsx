import React from "react";
import { useRegisterPlugin } from "@/ui/TextEditor";
import type { Decoration, EditorPlugin, EditorState, LinkPluginProps } from "../../types";

const BBCODE_URL_RE = /\[url=([^\]]+)\](.*?)\[\/url\]/g;
const PLAIN_URL_RE = /https?:\/\/[^\s\\[\]]+/g;

export const LinkPlugin: React.FC<LinkPluginProps> = ({ onLinkInsert }) => {
  const plugin: EditorPlugin = {
    name: "link",
    priority: 10,

    commands: {
      WRAP_LINK: ((payload: { url: string; selectionStart?: number; selectionEnd?: number }, editor) => {
        const { value } = editor.getState();
        const start = payload.selectionStart ?? editor.getState().selection.start;
        const end = payload.selectionEnd ?? editor.getState().selection.end;
        const url = payload.url;

        if (start !== end) {
          const selectedText = value.slice(start, end);
          editor.replaceRange(start, end, `[url=${url}]${selectedText}[/url]`);
        } else {
          const tag = `[url=${url}]${url}[/url]`;
          editor.insertText(tag, start);
        }

        onLinkInsert?.(url);
      }) as import("../../types").CommandHandler,
    },

    decorations(state: EditorState): Decoration[] {
      const decorations: Decoration[] = [];
      const { value } = state;
      const bbRanges: Array<[number, number]> = [];

      const bbRe = new RegExp(BBCODE_URL_RE.source, "g");
      let m: RegExpExecArray | null;
      while ((m = bbRe.exec(value)) !== null) {
        const fullStart = m.index;
        const fullEnd = fullStart + m[0].length;
        bbRanges.push([fullStart, fullEnd]);

        // [url=...] prefix → hide
        const prefixEnd = fullStart + `[url=${m[1]}]`.length;
        decorations.push({ start: fullStart, end: prefixEnd, type: "link-bracket", style: { fontSize: 0 } });
        // label text → underline
        const labelEnd = prefixEnd + m[2].length;
        decorations.push({ start: prefixEnd, end: labelEnd, type: "link" });
        // [/url] suffix → hide
        decorations.push({ start: labelEnd, end: fullEnd, type: "link-bracket", style: { fontSize: 0 } });
      }

      const plainRe = new RegExp(PLAIN_URL_RE.source, "g");
      let um: RegExpExecArray | null;
      while ((um = plainRe.exec(value)) !== null) {
        const uStart = um.index;
        const uEnd = uStart + um[0].length;
        const insideBb = bbRanges.some(([ms, me]) => uStart >= ms && uEnd <= me);
        if (insideBb) continue;
        decorations.push({ start: uStart, end: uEnd, type: "link" });
      }

      return decorations;
    },
  };

  useRegisterPlugin(plugin);
  return null;
};
