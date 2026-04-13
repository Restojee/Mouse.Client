import React, { useCallback } from "react";
import { Popup, PopupPosition, AnchorAlign } from "@/ui/Popup";
import { List } from "@/ui/List/List";
import type { ListItemOptions } from "@/ui/ContextMenu/ContextMenuItem";

export type LevelContextMenuItem = {
  id: number;
  name: string;
  image?: string;
};

type LevelContextMenuPropsType = {
  items: LevelContextMenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: LevelContextMenuItem) => void;
  activeItemId?: number | null;
  fixedAnchorRect?: { top: number; left: number; width?: number; height?: number };
  emptyLabel?: string;
};

const ANCHOR = <div style={{ display: "none" }} />;

const buildOptions = (items: LevelContextMenuItem[], emptyLabel: string): ListItemOptions[] => {
  if (!items.length) return [{ id: "__empty__", label: emptyLabel, disabled: true }];
  return items.map((item) => ({ id: item.id, label: item.name, avatar: item.image }));
};

export const LevelContextMenu: React.FC<LevelContextMenuPropsType> = ({
  items,
  isOpen,
  onClose,
  onSelect,
  activeItemId,
  fixedAnchorRect,
  emptyLabel = "Уровни не найдены",
}) => {
  const options = buildOptions(items, emptyLabel);

  const handleChange = useCallback(
    (option: ListItemOptions) => {
      if (option.id === "__empty__") return;
      const selected = items.find((item) => item.id === option.id);
      if (selected) onSelect(selected);
    },
    [items, onSelect],
  );

  return (
    <Popup
      anchor={ANCHOR}
      isVisible={isOpen}
      onClose={onClose}
      position={PopupPosition.TOP}
      anchorAlign={AnchorAlign.START}
      minWidth={220}
      offset={4}
      fixedAnchorRect={fixedAnchorRect}
      noOverlay
      noPadding
    >
      <List
        options={options}
        onChange={handleChange}
        size="sm"
        activeItemId={activeItemId ?? null}
      />
    </Popup>
  );
};
