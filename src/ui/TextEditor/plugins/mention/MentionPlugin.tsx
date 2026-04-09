import React, { useCallback, useRef, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@/ui/AutoComplete/Autocomplete";
import { usersApi } from "@/api/usersApi";
import { User } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { useRegisterPlugin, useEditor } from "@/ui/TextEditor";
import { getCaretPosition } from "../../core/getCaretPosition";
import { findMentionTriggerStart } from "../../core/utils";
import type { Decoration, EditorPlugin, EditorState, Editor, MentionPluginProps } from "../../types";

type DropdownState = {
  isOpen: boolean;
  isLoading: boolean;
  items: AutocompleteItem[];
  position: { top: number; left: number };
  activeIndex: number;
  triggerStart: number;
};

const DROPDOWN_INITIAL: DropdownState = {
  isOpen: false,
  isLoading: false,
  items: [],
  position: { top: 0, left: 0 },
  activeIndex: -1,
  triggerStart: 0,
};

const DEFAULT_QUERY_PATTERN = /^[\w\-а-яА-ЯёЁ]*$/;
const QUERY_CHAR_RE = /[\w\-а-яА-ЯёЁ]/;

const findQueryEnd = (value: string, triggerStart: number): number => {
  let i = triggerStart + 1; // skip '@'
  while (i < value.length && QUERY_CHAR_RE.test(value[i])) i++;
  return i;
};
const MENTION_HIGHLIGHT_RE = /(@[\w\-а-яА-ЯёЁ]+)/g;

const userToItem = (user: User): AutocompleteItem => ({
  id: user.id ?? String(Math.random()),
  label: user.username ?? "",
  avatar: user.avatar ? getAvatarImageLink(user.avatar) : "",
});

export const MentionPlugin: React.FC<MentionPluginProps> = ({ onInsert }) => {
  const { editor } = useEditor();
  const [dropdown, setDropdown] = useState<DropdownState>(DROPDOWN_INITIAL);

  const dropdownRef = useRef(dropdown);
  dropdownRef.current = dropdown;

  const onInsertRef = useRef(onInsert);
  onInsertRef.current = onInsert;

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setDropdown(DROPDOWN_INITIAL);
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const search = useCallback(async (query: string) => {
    setDropdown((s) => ({ ...s, isLoading: true }));
    try {
      const users = await usersApi.searchByUsername(query);
      setDropdown((s) => ({ ...s, isLoading: false, items: users.map(userToItem), isOpen: true }));
    } catch {
      setDropdown((s) => ({ ...s, isLoading: false, isOpen: false }));
    }
  }, []);

  const insertMention = useCallback(
    (username: string, triggerStart: number) => {
      const { value } = editor.getState();
      editor.replaceRange(triggerStart, findQueryEnd(value, triggerStart), `@${username} `);
      onInsertRef.current?.(username, triggerStart);
      dismiss();
    },
    [editor, dismiss],
  );

  const plugin: EditorPlugin = {
    name: "mention",
    priority: 100,

    commands: {
      INSERT_MENTION: (payload: unknown) => {
        const { username, triggerStart } = payload as { username: string; triggerStart: number };
        insertMention(username, triggerStart);
      },
    },

    onChange(state: EditorState, _editor: Editor) {
      const { value, selection } = state;
      const cursorPos = selection.start;
      const triggerStart = findMentionTriggerStart(value, cursorPos);

      if (triggerStart === -1) {
        if (dropdownRef.current.isOpen) dismiss();
        return;
      }

      const query = value.slice(triggerStart + 1, cursorPos);
      if (!DEFAULT_QUERY_PATTERN.test(query)) {
        dismiss();
        return;
      }

      const position = _editor.getDiv() ? getCaretPosition() : { top: 0, left: 0 };

      setDropdown((s) => ({ ...s, position, triggerStart, isOpen: true, activeIndex: -1 }));
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => search(query), 200);
    },

    onKeyDown(e) {
      const s = dropdownRef.current;
      if (!s.isOpen) return false;
      if (e.key === "Escape") {
        dismiss();
        return true;
      }
      if (e.key === "ArrowDown") {
        setDropdown((prev) => ({ ...prev, activeIndex: Math.min(prev.activeIndex + 1, prev.items.length - 1) }));
        return true;
      }
      if (e.key === "ArrowUp") {
        setDropdown((prev) => ({ ...prev, activeIndex: Math.max(prev.activeIndex - 1, 0) }));
        return true;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        const item = s.items[s.activeIndex];
        if (item) {
          insertMention(item.label, s.triggerStart);
          return true;
        }
      }
      return false;
    },

    decorations(state: EditorState): Decoration[] {
      const re = new RegExp(MENTION_HIGHLIGHT_RE.source, "g");
      const decorations: Decoration[] = [];
      let match: RegExpExecArray | null;
      while ((match = re.exec(state.value)) !== null) {
        decorations.push({ start: match.index, end: match.index + match[0].length, type: "mention" });
      }
      return decorations;
    },
  };

  useRegisterPlugin(plugin);

  const activeItemId =
    dropdown.activeIndex >= 0 && dropdown.items[dropdown.activeIndex] ? dropdown.items[dropdown.activeIndex].id : null;

  return (
    <Autocomplete
      isOpen={dropdown.isOpen}
      isLoading={dropdown.isLoading}
      items={dropdown.items}
      position={dropdown.position}
      onClose={dismiss}
      onSelect={(item: AutocompleteItem) => insertMention(item.label, dropdown.triggerStart)}
      activeItemId={activeItemId}
    />
  );
};

export { MENTION_PATTERN, splitMentions } from "./useMentionPlugin";
