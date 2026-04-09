import React, { useState } from "react";
import type { InlineNode, RootNode } from "./model/types";
import { parseText } from "./model/parseText";
import { TextLink } from "@/ui/TextLink/TextLink";

export type RichContentCallbacks = {
  onMentionClick?: (username: string) => void;
  onLinkClick?: (url: string) => void;
};

const SpoilerInline: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  return (
    <span
      title={opened ? "" : "Открыть спойлер"}
      onClick={() => setOpened(true)}
      style={opened ? undefined : { filter: "blur(6px)", opacity: 0.6, cursor: "pointer" }}
    >
      {children}
    </span>
  );
};

const renderInline = (node: InlineNode, key: number, cb: RichContentCallbacks): React.ReactNode => {
  if (node.type === "text") {
    let el: React.ReactNode = node.text;
    if (node.format?.bold) el = <strong>{el}</strong>;
    if (node.format?.italic) el = <em>{el}</em>;
    if (node.format?.underline) el = <u>{el}</u>;
    return <React.Fragment key={key}>{el}</React.Fragment>;
  }
  if (node.type === "link") {
    const text = node.children.map((c) => c.text).join("");
    const handleClick = () => {
      if (cb.onLinkClick) {
        cb.onLinkClick(node.url);
        return;
      }
      window.open(node.url, "_blank", "noopener,noreferrer");
    };
    return (
      <TextLink
        key={key}
        onClick={handleClick}
      >
        {text || node.url}
      </TextLink>
    );
  }
  if (node.type === "mention") {
    return (
      <TextLink
        key={key}
        onClick={() => cb.onMentionClick?.(node.username)}
      >
        @{node.username}
      </TextLink>
    );
  }
  if (node.type === "spoiler") {
    const text = node.children.map((c) => c.text).join("");
    return <SpoilerInline key={key}>{text}</SpoilerInline>;
  }
  return null;
};

const renderRoot = (root: RootNode, cb: RichContentCallbacks): React.ReactNode => {
  if (!root.children || root.children.length === 0) return null;
  return root.children.map((para, pi) => (
    <React.Fragment key={pi}>
      {pi > 0 && <br />}
      {para.children.map((node, ni) => renderInline(node, ni, cb))}
    </React.Fragment>
  ));
};

export const renderRichContent = (
  content: string,
  callbacks: RichContentCallbacks = {},
  validUsernames?: string[],
): React.ReactNode => {
  if (!content) return null;
  const validSet = validUsernames ? new Set(validUsernames) : undefined;
  return renderRoot(parseText(content, validSet), callbacks);
};
