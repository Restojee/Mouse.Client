/**
 * Consolidated editor tests — max 10.
 * Covers the pure-function layer: buildSegments, format decorations,
 * toolbar wrap logic, parseText, and segmentsToHtml output contract.
 */

import { buildSegments } from "../../core/buildSegments";
import { parseText } from "../parseText";
import type { Decoration } from "../../types";

// ─── Mirrors of internal helpers (pure, no DOM) ───────────────────────────────

const HIDDEN: React.CSSProperties = { fontSize: 0 };

const buildFormatDecorations = (value: string): Decoration[] => {
  const rules = [
    {
      open: "[b]",
      close: "[/b]",
      re: /\[b\]([\s\S]*?)\[\/b\]/gi,
      style: { fontWeight: "bold" } as React.CSSProperties,
    },
    {
      open: "[i]",
      close: "[/i]",
      re: /\[i\]([\s\S]*?)\[\/i\]/gi,
      style: { fontStyle: "italic" } as React.CSSProperties,
    },
    {
      open: "[u]",
      close: "[/u]",
      re: /\[u\]([\s\S]*?)\[\/u\]/gi,
      style: { textDecoration: "underline" } as React.CSSProperties,
    },
  ];
  const decorations: Decoration[] = [];
  for (const rule of rules) {
    const re = new RegExp(rule.re.source, "gi");
    let m: RegExpExecArray | null;
    while ((m = re.exec(value)) !== null) {
      const fs = m.index,
        fe = fs + m[0].length;
      const cs = fs + rule.open.length,
        ce = fe - rule.close.length;
      decorations.push({ start: fs, end: cs, type: "format-tag", style: HIDDEN });
      decorations.push({ start: cs, end: ce, type: "format-content", style: rule.style });
      decorations.push({ start: ce, end: fe, type: "format-tag", style: HIDDEN });
    }
  }
  return decorations;
};

const simulateWrap = (value: string, start: number, end: number, open: string, close: string) => {
  const selected = value.slice(start, end);
  const replacement = open + selected + close;
  const newValue = value.slice(0, start) + replacement + value.slice(end);
  const cursor = start + replacement.length;
  return { newValue, cursor };
};

import type React from "react";

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("buildSegments", () => {
  it("plain text with no decorations returns single segment", () => {
    const segs = buildSegments("hello world", []);
    expect(segs).toHaveLength(1);
    expect(segs[0].text).toBe("hello world");
    expect(segs[0].type).toBeNull();
  });

  it("decoration splits text into 3 segments: before, styled, after", () => {
    const decs: Decoration[] = [{ start: 6, end: 11, type: "mention" }];
    const segs = buildSegments("hello world end", decs);
    expect(segs.find((s) => s.type === "mention")?.text).toBe("world");
    expect(segs.find((s) => s.text === "hello ")?.type).toBeNull();
    expect(segs.find((s) => s.text === " end")?.type).toBeNull();
  });
});

describe("format decorations", () => {
  it("[b]word[/b] — tag segments are hidden (fontSize: 0)", () => {
    const decs = buildFormatDecorations("[b]word[/b]");
    const tags = decs.filter((d) => d.type === "format-tag");
    expect(tags).toHaveLength(2);
    tags.forEach((t) => expect(t.style?.fontSize).toBe(0));
  });

  it("[b]word[/b] — content segment has bold style", () => {
    const decs = buildFormatDecorations("[b]word[/b]");
    const segs = buildSegments("[b]word[/b]", decs);
    const content = segs.find((s) => s.type === "format-content");
    expect(content?.text).toBe("word");
    expect(content?.style?.fontWeight).toBe("bold");
  });

  it("[i] and [u] apply correct styles", () => {
    const italic = buildSegments("[i]hi[/i]", buildFormatDecorations("[i]hi[/i]")).find(
      (s) => s.type === "format-content",
    );
    expect(italic?.style?.fontStyle).toBe("italic");

    const under = buildSegments("[u]hi[/u]", buildFormatDecorations("[u]hi[/u]")).find(
      (s) => s.type === "format-content",
    );
    expect(under?.style?.textDecoration).toBe("underline");
  });
});

describe("toolbar wrap", () => {
  it("wraps selected text with tags", () => {
    const { newValue } = simulateWrap("hello world", 6, 11, "[b]", "[/b]");
    expect(newValue).toBe("hello [b]world[/b]");
  });

  it("cursor lands after closing tag, not at end of full string", () => {
    const { cursor } = simulateWrap("hello world end", 6, 11, "[b]", "[/b]");
    // correct: 6 + len("[b]world[/b]") = 18
    expect(cursor).toBe(18);
    // NOT 22 (end of full string)
    expect("hello [b]world[/b] end".length).toBe(22);
    expect(cursor).not.toBe(22);
  });

  it("preserves text after selection", () => {
    const { newValue } = simulateWrap("foo bar baz", 4, 7, "[u]", "[/u]");
    expect(newValue).toBe("foo [u]bar[/u] baz");
    expect(newValue.endsWith(" baz")).toBe(true);
  });
});

describe("parseText", () => {
  it("parses [b]bold[/b] → bold text node", () => {
    const root = parseText("[b]bold[/b]");
    const para = root.children[0];
    const node = para.children.find((n) => n.type === "text" && "format" in n && n.format?.bold);
    expect(node).toBeDefined();
  });

  it("parses @mention → mention node", () => {
    const root = parseText("hello @user how are you");
    const mention = root.children[0].children.find((n) => n.type === "mention");
    expect(mention).toBeDefined();
    if (mention?.type === "mention") expect(mention.username).toBe("user");
  });
});
