import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { LevelContextMenu, LevelContextMenuItem } from "./LevelContextMenu";

export type LevelMentionProps = {
  items: LevelContextMenuItem[];
  command: (attrs: { id: number; label: string }) => void;
  rect?: { top: number; left: number; width?: number; height?: number } | null;
};

export type LevelMentionRef = {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
};

export const LevelMention = forwardRef<LevelMentionRef, LevelMentionProps>(({ items, command, rect }, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setIsClosed(false);
  }, [items]);

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
          command({ id: item.id, label: item.name });
          return true;
        }
      }
      if (event.key === "Escape") return true;
      return false;
    },
  }));

  const handleClose = useCallback(() => setIsClosed(true), []);

  const handleSelect = useCallback(
    (item: LevelContextMenuItem) => command({ id: item.id, label: item.name }),
    [command],
  );

  return (
    <LevelContextMenu
      items={items}
      isOpen={!!rect && !isClosed}
      onClose={handleClose}
      onSelect={handleSelect}
      activeItemId={items[activeIndex]?.id ?? null}
      fixedAnchorRect={rect ?? undefined}
    />
  );
});

LevelMention.displayName = "LevelMention";
