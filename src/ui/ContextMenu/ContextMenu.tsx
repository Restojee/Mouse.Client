import React, { useCallback } from "react";
import { AnchorAlign, Popup, PopupPosition } from "@/ui/Popup";
import contextMenuStyles from "./ContextMenu.module.scss";
import { List } from "@/ui/List/List";
import type { ListItemOptions, ThemeSizes } from "./ContextMenuItem";

export type ContextMenuPosition = { top: number; left: number };
export type ContextMenuOption = ListItemOptions;

type ContextMenuProps = {
  items: ListItemOptions[];
  anchor: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
  onChange?: (option: ListItemOptions) => void;
  size?: ThemeSizes;
  position?: PopupPosition;
  anchorAlign?: AnchorAlign;
  title?: string;
  header?: React.ReactNode;
  showCheckbox?: boolean;
  showSearch?: boolean;
  minWidth?: number;
  activeItemId?: string | number | null;
  transformOrigin?: string;
  offset?: number;
  fixedAnchorRect?: { top: number; left: number; width?: number; height?: number };
  noOverlay?: boolean;
  className?: string;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  anchor,
  isOpen,
  onClose,
  onChange,
  size = "sm",
  position = PopupPosition.BOTTOM,
  anchorAlign = AnchorAlign.START,
  title,
  showCheckbox = false,
  showSearch = false,
  minWidth = 150,
  activeItemId,
  transformOrigin,
  offset,
  header,
  fixedAnchorRect,
  noOverlay,
  className,
}) => {
  const handleOptionChange = useCallback(
    (option: ListItemOptions) => {
      if (!showCheckbox) {
        onClose();
      }
      onChange?.(option);
    },
    [onChange, onClose, showCheckbox],
  );

  const content = (
    <>
      {header}
      {title && (
        <div
          className={[contextMenuStyles.title, size === "sm" ? contextMenuStyles.titleSm : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
        </div>
      )}
      <List
        options={items}
        onChange={handleOptionChange}
        size={size}
        showCheckbox={showCheckbox}
        showSearch={showSearch}
        activeItemId={activeItemId}
      />
    </>
  );
  return (
    <Popup
      anchor={anchor}
      isVisible={isOpen}
      onClose={onClose}
      position={position}
      anchorAlign={anchorAlign}
      minWidth={minWidth}
      transformOrigin={transformOrigin}
      offset={offset}
      fixedAnchorRect={fixedAnchorRect}
      noOverlay={noOverlay}
      className={className}
      noPadding
    >
      {content}
    </Popup>
  );
};
