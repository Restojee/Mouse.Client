import { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import { Markdown } from "tiptap-markdown";
import type { AnyExtension } from "@tiptap/core";
import type { MentionSuggestion } from "../userMentionSuggestion";
import styles from "../RichEditor.module.css";

type Options = {
  placeholder?: string;
  mention?: MentionSuggestion;
  levelMention?: MentionSuggestion;
  maxLength?: number;
  allowHtml?: boolean;
};

export const useRichEditorExtensions = ({
  placeholder = "",
  mention,
  levelMention,
  maxLength,
  allowHtml = false,
}: Options) =>
  useMemo<AnyExtension[]>(() => {
    const ext: AnyExtension[] = [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        listItem: false,
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        protocols: ["http", "https", "mailto", "tel", "mention", "level"],
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Placeholder.configure({ placeholder }),
      Markdown.configure({ html: allowHtml, linkify: true, breaks: true, transformPastedText: true }),
    ];

    if (typeof maxLength === "number") {
      ext.push(CharacterCount.configure({ limit: maxLength }));
    }

    if (mention) {
      ext.push(
        Mention.extend({
          renderText({ node }) {
            return `@${node.attrs.label ?? node.attrs.id}`;
          },
          addStorage() {
            return {
              markdown: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                serialize(state: any, node: any) {
                  state.write(`@${node.attrs.label ?? node.attrs.id}`);
                },
                parse: {},
              },
            };
          },
        }).configure({
          HTMLAttributes: { class: styles.mention },
          suggestion: mention,
        }),
      );
    }

    if (levelMention) {
      ext.push(
        Mention.extend({
          name: "levelMention",
          renderText({ node }) {
            return `!${node.attrs.label ?? node.attrs.id}`;
          },
          addStorage() {
            return {
              markdown: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                serialize(state: any, node: any) {
                  state.write(`[!${node.attrs.label ?? node.attrs.id}](level://${node.attrs.id})`);
                },
                parse: {},
              },
            };
          },
        }).configure({
          HTMLAttributes: { class: styles.mention, "data-type": "levelMention" },
          suggestion: levelMention,
        }),
      );
    }

    return ext;
  }, [placeholder, mention, levelMention, maxLength, allowHtml]);
