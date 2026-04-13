import { ReactRenderer } from "@tiptap/react";
import { mapsApi } from "@/api/mapsApi";
import { getMapImageLink } from "@/common/utils";
import { LevelMention, LevelMentionRef } from "./LevelMention";
import type { LevelContextMenuItem } from "./LevelContextMenu";
import type { MentionOptions } from "@tiptap/extension-mention";

export type LevelMentionSuggestion = MentionOptions["suggestion"];

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const toRect = (clientRect: (() => DOMRect | null) | undefined) => {
  const r = clientRect?.();
  if (!r) return null;
  const vv = typeof window !== "undefined" ? window.visualViewport : null;
  const offsetTop = vv?.offsetTop ?? 0;
  const offsetLeft = vv?.offsetLeft ?? 0;
  return { top: r.top - offsetTop, left: r.left - offsetLeft, width: r.width, height: r.height };
};

export const levelMentionSuggestion: LevelMentionSuggestion = {
  char: "!",
  allowSpaces: false,

  items({ query }: { query: string }) {
    return new Promise<LevelContextMenuItem[]>((resolve) => {
      if (debounceTimer) clearTimeout(debounceTimer);

      const doSearch = async () => {
        try {
          const maps = await mapsApi.searchByName(query);
          resolve(
            (maps ?? []).map((map) => ({
              id: map.id ?? 0,
              name: map.name ?? "",
              image: map.image?.name ? getMapImageLink(map.image.name, "thumb") : "",
            })),
          );
        } catch {
          resolve([]);
        }
      };

      if (!query) {
        doSearch();
      } else {
        debounceTimer = setTimeout(doSearch, 200);
      }
    });
  },

  render() {
    let component: ReactRenderer<LevelMentionRef> | null = null;
    let container: HTMLDivElement | null = null;

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onStart(props: any) {
        container = document.createElement("div");
        document.body.appendChild(container);

        component = new ReactRenderer(LevelMention, {
          props: {
            items: props.items ?? [],
            command: props.command,
            rect: null,
          },
          editor: props.editor,
        });

        container.appendChild(component.element);

        component?.updateProps({
          items: props.items ?? [],
          command: props.command,
          rect: toRect(props.clientRect!),
        });
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onUpdate(props: any) {
        component?.updateProps({
          items: props.items ?? [],
          command: props.command,
          rect: toRect(props.clientRect!),
        });
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onKeyDown(props: any) {
        if (props.event.key === "Escape") return true;
        return component?.ref?.onKeyDown(props) ?? false;
      },

      onExit() {
        component?.destroy();
        container?.remove();
        component = null;
        container = null;
      },
    };
  },
};
