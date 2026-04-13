import React, { useCallback, useMemo } from "react";
import { ContextMenu } from "@/ui/ContextMenu";
import { AnchorAlign, PopupPosition } from "@/ui/Popup";
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
  /**
   * Viewport-координаты курсора (из getCaretPosition).
   * top = нижний край строки курсора, left = левый край курсора.
   * Передаются напрямую как fixedAnchorRect чтобы избежать проблемы
   * с CSS transform на предках (что ломает position:fixed).
   */
  position: { top: number; left: number };
  onClose: () => void;
  onSelect: (item: AutocompleteItem) => void;
  minWidth?: number;
  emptyLabel?: string;
  activeItemId?: string | number | null;
};

/**
 * Невидимый якорь, который рендерится в DOM, но не используется для вычисления позиции.
 * Нужен только как обязательный prop для Popup/ContextMenu.
 */
const NullAnchor = <div style={{ display: "none" }} />;

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

  return (
    <ContextMenu
      anchor={NullAnchor}
      items={menuItems}
      isOpen={isOpen}
      onClose={onClose}
      onChange={handleChange}
      position={PopupPosition.TOP}
      anchorAlign={AnchorAlign.START}
      minWidth={minWidth}
      activeItemId={activeItemId}
      fixedAnchorRect={{ top: position.top, left: position.left }}
    />
  );
};
