import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { List } from '@/ui/List/List';
import { StyledContextMenuOption, StyledSubMenuIcon, StyledSubMenuPopup } from './styled';
import type { ListItemOptions, ThemeSizes } from './ContextMenuItem';

type SubMenuListProps = {
  item: ListItemOptions;
  size?: ThemeSizes;
  onParentClose: () => void;
};

export const SubMenuList: React.FC<SubMenuListProps> = ({ item, size = 'sm', onParentClose }) => {
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
      <StyledContextMenuOption
        isDisabled={item.disabled}
        onMouseDown={(e) => {
          e.preventDefault();
          if (!item.disabled) {
            onParentClose();
          }
        }}
      >
        {item.icon && <span>{item.icon}</span>}
        {item.label}
      </StyledContextMenuOption>
    );
  }

  return (
    <>
      <StyledContextMenuOption
        isDisabled={item.disabled}
        onMouseEnter={handleOpen}
      >
        {item.icon && <span>{item.icon}</span>}
        {item.label}
        <StyledSubMenuIcon>▶</StyledSubMenuIcon>
      </StyledContextMenuOption>
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

const PortalSubMenu: React.FC<PortalSubMenuProps> = ({ items, parentRef, isOpen, onClose, size }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const anchor = useMemo(
    () => (
      <div
        ref={parentRef}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      />
    ),
    [parentRef, position],
  );

  return createPortal(
    <StyledSubMenuPopup>
      <List
        options={items}
        onChange={() => onClose()}
        size={size}
      />
    </StyledSubMenuPopup>,
    document.body,
  );
};
