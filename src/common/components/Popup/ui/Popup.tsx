import React, { useLayoutEffect, useEffect, useRef, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './Popup.module.scss';
import { Column, Paper, Row } from "@ui/Layout";
import clsx from "clsx";
import { usePopupPosition } from './usePopupPosition';
import { useResizeObserver } from './useResizeObserver';

interface PopupProps {
  header?: React.ReactElement;
  children: React.ReactElement;
  footer?: React.ReactElement;
  width?: number;
  height?: number;
  isVisible?: boolean;
  className?: string;
  onClose?: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  anchor: React.ReactElement;
}

export const Popup: React.FC<PopupProps> = (props) => {
  const { 
    header, 
    children,
    width,
    height,
    footer, 
    className, 
    isVisible,
    position,
    anchor,
    onClose
  } = props;

  const anchorRef = useRef(null);
  const popupRef = useRef(null);
  const [popupPositionStyles, setPopupPositionStyles] = useState({ left: 0, top: 0 });

  const getPopupPosition = usePopupPosition({ position, anchorRef, popupRef });

  const updatePosition = useCallback(() => {
    const position = getPopupPosition();
    if (position) {
      setPopupPositionStyles(position);
    }
  }, [getPopupPosition]);

  React.useEffect(() => {
    if (!isVisible || !onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      const popupElement = popupRef.current;
      const anchorElement = anchorRef.current;

      if (
        popupElement &&
        anchorElement &&
        !popupElement.contains(target) &&
        !anchorElement.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  // Обновляем позицию при изменении видимости
  useLayoutEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible, updatePosition]);

  const style: React.CSSProperties = { width, height, ...popupPositionStyles };

  return (
    <Column className={styles.Wrapper}>
      <Paper ref={anchorRef}>
        {anchor}
      </Paper>
      {isVisible && (
        ReactDOM.createPortal(
          (
            <Column
              ref={popupRef}
              className={clsx(
                styles.Popup,
                className
              )}
              style={style}
              nonIntegration
            >
              <Column pa="md">
                {header && <Row className={styles.Header}>{header}</Row>}

                <Column className={styles.Body} gap="md">
                  {children}
                </Column>

                {footer && <Row className={styles.Footer}>{footer}</Row>}
              </Column>
            </Column>
          ),
          document.body
        )
      )}
    </Column>
  );
};
