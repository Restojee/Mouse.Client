import React, { useCallback } from "react";
import { Popup, PopupPosition, AnchorAlign } from "@/ui/Popup";
import { StyledContextMenuList, StyledContextMenuTitle, StyledContextMenuDivider } from "./styled";
import { SubMenuList } from "./SubMenuList";
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
  showCheckbox?: boolean;
  showSearch?: boolean;
  minWidth?: number;
  fixedAnchorRect?: { top: number; left: number; width?: number; height?: number };
  activeItemId?: string | number | null;
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

  const hasSubmenus = items.some((opt) => opt.submenu);

  const content = hasSubmenus ? (
    <StyledContextMenuList>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          {item.divider && <StyledContextMenuDivider />}
          <SubMenuList
            item={item}
            size={size}
            onParentClose={onClose}
          />
        </React.Fragment>
      ))}
    </StyledContextMenuList>
  ) : (
    <>
      {title && <StyledContextMenuTitle size={size}>{title}</StyledContextMenuTitle>}
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
      noPadding
    >
      {content}
    </Popup>
  );
};
