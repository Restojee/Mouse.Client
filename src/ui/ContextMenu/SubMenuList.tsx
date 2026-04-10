import React, { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { List } from "@/ui/List/List";
import contextMenuStyles from "./ContextMenu.module.scss";
import type { ListItemOptions, ThemeSizes } from "./ContextMenuItem";

type SubMenuListProps = {
  item: ListItemOptions;
  size?: ThemeSizes;
  onParentClose: () => void;
};

export const SubMenuList: React.FC<SubMenuListProps> = ({ item, size = "sm", onParentClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => {
    if (!item.disabled && item.submenu) {
      setIsOpen(true);
    }
  }, [item.disabled, item.submenu]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (!item.submenu) {
    return (
      <div
        className={[contextMenuStyles.option, item.disabled && contextMenuStyles.optionDisabled].filter(Boolean).join(" ")}
        onMouseDown={(e) => {
          e.preventDefault();
          if (!item.disabled) {
            onParentClose();
          }
        }}
      >
        {item.icon && <span>{item.icon}</span>}
        {item.label}
      </div>
    );
  }

  return (
    <>
      <div
        className={[contextMenuStyles.option, item.disabled && contextMenuStyles.optionDisabled].filter(Boolean).join(" ")}
        onMouseEnter={handleOpen}
      >
        {item.icon && <span>{item.icon}</span>}
        {item.label}
        <span className={contextMenuStyles.subMenuIcon}>▶</span>
      </div>
      {isOpen && item.submenu && (
        <PortalSubMenu
          items={item.submenu}
          parentRef={anchorRef}
          isOpen={isOpen}
          onClose={handleClose}
          size={size}
        />
      )}
    </>
  );
};

type PortalSubMenuProps = {
  items: ListItemOptions[];
  parentRef: React.RefObject<HTMLDivElement>;
  isOpen: boolean;
  onClose: () => void;
  size?: ThemeSizes;
};

const PortalSubMenu: React.FC<PortalSubMenuProps> = ({ items, onClose, size }) => {
  return createPortal(
    <div className={contextMenuStyles.subMenuPopup}>
      <List
        options={items}
        onChange={() => onClose()}
        size={size}
      />
    </div>,
    document.body,
  );
};
