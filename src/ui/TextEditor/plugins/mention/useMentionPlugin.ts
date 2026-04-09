import { useCallback, useRef, useState } from "react";
import { usersApi } from "@/api/usersApi";
import { User } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { AutocompleteItem } from "@/ui/AutoComplete/Autocomplete";
import { AutocompletePlugin, PluginDropdownState } from "@/ui/TextEditor";

type MentionState = {
  isOpen: boolean;
  isLoading: boolean;
  items: AutocompleteItem[];
  position: { top: number; left: number };
  activeIndex: number;
  triggerStart: number;
};

const INITIAL: MentionState = {
  isOpen: false,
  isLoading: false,
  items: [],
  position: { top: 0, left: 0 },
  activeIndex: -1,
  triggerStart: 0,
};

function userToItem(user: User): AutocompleteItem {
  return {
    id: user.id ?? String(Math.random()),
    label: user.username ?? "",
    avatar: user.avatar ? getAvatarImageLink(user.avatar) : "",
  };
}

export function useMentionPlugin(onInsert: (username: string, triggerStart: number) => void): {
  plugin: AutocompletePlugin;
} {
  const [state, setState] = useState<MentionState>(INITIAL);
  // Ref нужен для стабильного доступа к state внутри getDropdownState без замыкания
  const stateRef = useRef(state);
  stateRef.current = state;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setState(INITIAL);
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const search = useCallback(async (query: string) => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const users = await usersApi.searchByUsername(query);
      setState((s) => ({
        ...s,
        isLoading: false,
        items: users.map(userToItem),
        isOpen: true,
      }));
    } catch {
      setState((s) => ({ ...s, isLoading: false, isOpen: false }));
    }
  }, []);

  const onMatch = useCallback(
    (query: string, position: { top: number; left: number }, triggerStart: number) => {
      setState((s) => ({ ...s, position, triggerStart, isOpen: true, activeIndex: -1 }));
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => search(query), 200);
    },
    [search],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
      const s = stateRef.current;
      if (!s.isOpen) return false;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setState((prev) => ({
          ...prev,
          activeIndex: Math.min(prev.activeIndex + 1, prev.items.length - 1),
        }));
        return true;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setState((prev) => ({ ...prev, activeIndex: Math.max(prev.activeIndex - 1, 0) }));
        return true;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        const item = s.items[s.activeIndex];
        if (item) {
          onInsert(item.label, s.triggerStart);
          dismiss();
          return true;
        }
      }
      return false;
    },
    [onInsert, dismiss],
  );

  const handleSelect = useCallback(
    (item: AutocompleteItem) => {
      onInsert(item.label, stateRef.current.triggerStart);
      dismiss();
    },
    [onInsert, dismiss],
  );

  const getDropdownState = useCallback((): PluginDropdownState => {
    const s = stateRef.current;
    return {
      pluginName: "mention",
      isOpen: s.isOpen,
      isLoading: s.isLoading,
      items: s.items,
      position: s.position,
      activeIndex: s.activeIndex,
      onClose: dismiss,
      onSelect: handleSelect,
    };
  }, [dismiss, handleSelect]);

  const pluginRef = useRef<AutocompletePlugin>({
    name: "mention",
    trigger: "@",
    highlightPattern: /(@[\w\-а-яА-ЯёЁ]+)/g,
    onMatch,
    onDismiss: dismiss,
    onKeyDown,
    getDropdownState,
  });
  pluginRef.current.onMatch = onMatch;
  pluginRef.current.onDismiss = dismiss;
  pluginRef.current.onKeyDown = onKeyDown;
  pluginRef.current.getDropdownState = getDropdownState;
  pluginRef.current.highlightPattern = /(@[\w\-а-яА-ЯёЁ]+)/g;

  return { plugin: pluginRef.current };
}

/** рег для поиска @username в готовом тексте (Message, Chat) */
export const MENTION_PATTERN = /@[\w\-а-яА-ЯёЁ]+/g;

/** разбивает текст на сегменты: строки и { type: "mention"; username } */
export function splitMentions(text: string): (string | { type: "mention"; username: string })[] {
  const result: (string | { type: "mention"; username: string })[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(MENTION_PATTERN.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) result.push(text.slice(lastIndex, match.index));
    result.push({ type: "mention", username: match[0].slice(1) });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) result.push(text.slice(lastIndex));
  return result.length > 0 ? result : [text];
}
