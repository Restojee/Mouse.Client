import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { ContextMenu } from "@/ui/ContextMenu";
import { AnchorAlign, PopupPosition } from "@/ui/Popup";
import type { ListItemOptions } from "@/ui/ContextMenu/ContextMenuItem";
import type { AutocompleteItem } from "@/ui/AutoComplete/Autocomplete";

export type MentionListProps = {
  items: AutocompleteItem[];
  command: (attrs: { id: string | number; label: string }) => void;
  rect?: { top: number; left: number; width?: number; height?: number } | null;
};

export type MentionListRef = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
};

const ANCHOR = <div style={{ display: "none" }} />;

export const MentionList = forwardRef<MentionListRef, MentionListProps>(({ items, command, rect }, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setIsClosed(false);
  }, [items]);

  const handleClose = useCallback(() => setIsClosed(true), []);

  useImperativeHandle(ref, () => ({
    onKeyDown({ event }) {
      if (event.key === "ArrowDown") {
        setActiveIndex((i) => Math.min(i + 1, items.length - 1));
        return true;
      }
      if (event.key === "ArrowUp") {
        setActiveIndex((i) => Math.max(i - 1, 0));
        return true;
      }
      if (event.key === "Enter" || event.key === "Tab") {
        const item = items[activeIndex];
        if (item) {
          command({ id: item.id, label: item.label });
          return true;
        }
      }
      if (event.key === "Escape") return true;
      return false;
    },
  }));

  const listItems: ListItemOptions[] =
    items.length === 0
      ? [{ id: "__empty__", label: "Ничего не найдено", disabled: true }]
      : items.map((item) => ({
          id: item.id,
          label: item.label,
          avatar: item.avatar,
        }));

  const handleChange = (option: ListItemOptions) => {
    if (option.id === "__empty__") return;
    const item = items.find((i) => i.id === option.id);
    if (item) command({ id: item.id, label: item.label });
  };

  return (
    <ContextMenu
      items={listItems}
      anchor={ANCHOR}
      isOpen={!!rect && !isClosed}
      onClose={handleClose}
      onChange={handleChange}
      size="sm"
      position={PopupPosition.TOP}
      anchorAlign={AnchorAlign.START}
      minWidth={200}
      activeItemId={items[activeIndex]?.id ?? null}
      offset={4}
      fixedAnchorRect={rect ?? undefined}
      noOverlay
    />
  );
});

MentionList.displayName = "MentionList";
