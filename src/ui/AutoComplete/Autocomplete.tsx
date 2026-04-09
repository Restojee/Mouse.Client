import React, { useCallback, useMemo } from "react";
import { ContextMenu } from "@/ui/ContextMenu";
import { PopupPosition, AnchorAlign } from "@/ui/Popup";
import type { ListItemOptions } from "@/ui/ContextMenu/ContextMenuItem";

export type AutocompleteItem = {
  id: string | number;
  label: string;
  avatar?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type AutocompleteProps = {
  items: AutocompleteItem[];
  isOpen: boolean;
  isLoading?: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  onSelect: (item: AutocompleteItem) => void;
  minWidth?: number;
  emptyLabel?: string;
  activeItemId?: string | number | null;
};

export const Autocomplete = ({
  items,
  isOpen,
  isLoading = false,
  position,
  onClose,
  onSelect,
  minWidth = 200,
  emptyLabel = "Ничего не найдено",
  activeItemId,
}: AutocompleteProps) => {
  const menuItems: ListItemOptions[] = useMemo(() => {
    if (isLoading) return [{ id: "__loading__", label: "Загрузка...", disabled: true }];
    if (items.length === 0) return [{ id: "__empty__", label: emptyLabel, disabled: true }];
    return items.map((item) => ({
      id: item.id,
      label: item.label,
      avatar: item.avatar,
      icon: item.icon,
      disabled: item.disabled,
    }));
  }, [items, isLoading, emptyLabel]);

  const handleChange = useCallback(
    (option: ListItemOptions) => {
      if (option.id === "__loading__" || option.id === "__empty__") return;
      const item = items.find((i) => i.id === option.id);
      if (item) onSelect(item);
    },
    [items, onSelect],
  );

  const anchor = (
    <div
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
    />
  );

  return (
    <ContextMenu
      anchor={anchor}
      items={menuItems}
      isOpen={isOpen}
      onClose={onClose}
      onChange={handleChange}
      position={PopupPosition.TOP}
      anchorAlign={AnchorAlign.CENTER}
      minWidth={minWidth}
      activeItemId={activeItemId}
    />
  );
};
