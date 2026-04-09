import React, { useCallback, useRef, useState } from 'react';
import { ContextMenu } from './ContextMenu';
import { PopupPosition, AnchorAlign } from '@/ui/Popup';
import type { ListItemOptions } from './ContextMenuItem';

interface ContextMenuTriggerProps {
  items: ListItemOptions[];
  children: React.ReactElement;
  onChange?: (option: ListItemOptions) => void;
  size?: 'sm' | 'md';
  title?: string;
  showCheckbox?: boolean;
  showSearch?: boolean;
  minWidth?: number;
  disabled?: boolean;
}

export const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({
  items,
  children,
  onChange,
  size = 'sm',
  title,
  showCheckbox = false,
  minWidth = 150,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
      setPosition({ x: event.clientX, y: event.clientY });
      setIsOpen(true);
    },
    [disabled],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const anchor = (
    <div
      ref={anchorRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 0,
        height: 0,
        pointerEvents: 'none',
      }}
    />
  );

  return (
    <>
      {React.cloneElement(children, { onContextMenu: handleContextMenu })}
      {isOpen && (
        <ContextMenu
          items={items}
          anchor={anchor}
          isOpen={isOpen}
          onClose={handleClose}
          onChange={onChange}
          size={size}
          position={PopupPosition.BOTTOM}
          anchorAlign={AnchorAlign.START}
          title={title}
          showCheckbox={showCheckbox}
          minWidth={minWidth}
        />
      )}
    </>
  );
};
