import React, { useCallback, useMemo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { useRichEditorExtensions } from "./hooks/useRichEditorExtensions";
import styles from "./RenderMarkdown.module.scss";

const MENTION_PROTOCOL = "mention://";
const LEVEL_PROTOCOL = "level://";
const MENTION_RE = /(?<![\w[])@([\w\-а-яА-ЯёЁ]+)/g;
const LEVEL_RE = /(?<![\w[])!([\w\-а-яА-ЯёЁ]+)/g;
const SPOILER_RE = /\|\|([\s\S]+?)\|\|/g;
const AUTOLINK_RE = /<((?:https?|mailto|tel):[^\s>]+)>/g;

type RenderMarkdownPropsType = {
  content: string;
  validUsernames?: string[];
  onMentionClick?: (username: string) => void;
  onLevelClick?: (idOrName: string) => void;
  onLinkClick?: (url: string) => void;
};

const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const buildProcessedContent = (content: string, validSet?: Set<string>) => {
  const withAutolinks = content.replace(AUTOLINK_RE, (_m, url) => `[${url}](${url})`);
  const escaped = escapeHtml(withAutolinks);
  const withSpoilers = escaped.replace(SPOILER_RE, (_match, inner) => `<span data-spoiler="1">${inner}</span>`);
  const withLevels = withSpoilers.replace(LEVEL_RE, (_m, name) => `[!${name}](${LEVEL_PROTOCOL}${name})`);
  return withLevels.replace(MENTION_RE, (match, username) => {
    if (validSet && !validSet.has(username)) return match;
    return `[@${username}](${MENTION_PROTOCOL}${username})`;
  });
};

export const RenderMarkdown: React.FC<RenderMarkdownPropsType> = ({
  content,
  validUsernames,
  onMentionClick,
  onLevelClick,
  onLinkClick,
}) => {
  const validSet = useMemo(
    () => (validUsernames && validUsernames.length ? new Set(validUsernames) : undefined),
    [validUsernames],
  );
  const processedContent = useMemo(() => buildProcessedContent(content, validSet), [content, validSet]);
  const extensions = useRichEditorExtensions({ allowHtml: true });

  const editor = useEditor(
    {
      extensions,
      content: processedContent,
      editable: false,
      immediatelyRender: false,
    },
    [processedContent, extensions],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const targetElement = event.target as HTMLElement;
      const spoiler = targetElement.closest("[data-spoiler]") as HTMLElement | null;
      if (spoiler && spoiler.dataset.spoiler !== "open") {
        spoiler.dataset.spoiler = "open";
        event.preventDefault();
        return;
      }

      const anchor = targetElement.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      event.preventDefault();
      if (href.startsWith(MENTION_PROTOCOL)) {
        onMentionClick?.(href.slice(MENTION_PROTOCOL.length));
        return;
      }
      if (href.startsWith(LEVEL_PROTOCOL)) {
        onLevelClick?.(href.slice(LEVEL_PROTOCOL.length));
        return;
      }
      if (onLinkClick) {
        onLinkClick(href);
        return;
      }
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [onMentionClick, onLevelClick, onLinkClick],
  );

  if (!content) return null;

  return (
    <div
      className={styles.content}
      onClick={handleClick}
    >
      <EditorContent editor={editor} />
    </div>
  );
};
