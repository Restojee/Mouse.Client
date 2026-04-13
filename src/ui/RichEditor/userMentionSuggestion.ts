import { ReactRenderer } from "@tiptap/react";
import { usersApi } from "@/api/usersApi";
import { getAvatarImageLink } from "@/common/utils";
import { MentionList, MentionListRef } from "./MentionList";
import type { AutocompleteItem } from "@/ui/AutoComplete/Autocomplete";
import type { MentionOptions } from "@tiptap/extension-mention";

export type MentionSuggestion = MentionOptions["suggestion"];

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const toRect = (clientRect: (() => DOMRect | null) | undefined) => {
  const r = clientRect?.();
  if (!r) return null;
  const vv = typeof window !== "undefined" ? window.visualViewport : null;
  const offsetTop = vv?.offsetTop ?? 0;
  const offsetLeft = vv?.offsetLeft ?? 0;
  return { top: r.top - offsetTop, left: r.left - offsetLeft, width: r.width, height: r.height };
};

export const userMentionSuggestion: MentionSuggestion = {
  char: "@",
  allowSpaces: false,

  items({ query }: { query: string }) {
    return new Promise<AutocompleteItem[]>((resolve) => {
      if (debounceTimer) clearTimeout(debounceTimer);

      const doSearch = async () => {
        try {
          const users = await usersApi.searchByUsername(query);
          resolve(
            users.map((user) => ({
              id: user.id ?? 0,
              label: user.username ?? "",
              avatar: user.avatar ? getAvatarImageLink(user.avatar, "thumb") : "",
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
    let component: ReactRenderer<MentionListRef> | null = null;
    let container: HTMLDivElement | null = null;

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onStart(props: any) {
        container = document.createElement("div");
        document.body.appendChild(container);

        component = new ReactRenderer(MentionList, {
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
