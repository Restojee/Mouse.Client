import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Popup.module.scss';
import { Column, Paper, Row } from "@ui/Layout";
import clsx from "clsx";
import { usePopupPosition } from "@ui/Popup";
import { useOutsideClick } from "@ui/Popup/ui/useOutsideClick";
import { useScrollDetection } from './useScrollDetection';
import { PositionStyles } from "@ui/Popup/ui/usePopupPosition";

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
  closeOnScroll?: boolean;
}

const defaultPosition = { left: 0, top: 0 };

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
    onClose,
    closeOnScroll = true
  } = props;

  const anchorRef = React.useRef<HTMLElement>(null);
  const popupRef = React.useRef<HTMLElement>(null);
  const [popupPositionStyles, setPopupPositionStyles] = React.useState<PositionStyles>(null);
  const [isRendered, setIsRendered] = React.useState<boolean>(false);

  const handleScrollDetection = React.useCallback(() => {
    if (closeOnScroll) {
      onClose?.();
    }
  }, [onClose, closeOnScroll])

  const getPopupPosition = usePopupPosition({ position, anchorRef, popupRef });
  useOutsideClick([popupRef], onClose, isVisible);
  useScrollDetection(handleScrollDetection, isVisible && closeOnScroll);

  const updatePosition = React.useCallback(() => {
    setPopupPositionStyles(getPopupPosition());
  }, [getPopupPosition]);

  React.useEffect(() => {
    if (isVisible && anchorRef && popupRef) {
      updatePosition()
    }
  }, [isVisible, anchorRef, popupRef]);

  React.useEffect(() => {
    if (popupPositionStyles) {
      setIsRendered(true);
    }
  }, [popupPositionStyles])

  const popupClasses = clsx(
    styles.Popup, 
    className,
    isRendered && styles.visible
  );

  const style: React.CSSProperties = {
    width,
    height,
    ...defaultPosition,
    ...popupPositionStyles
  };

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
              className={popupClasses}
              style={style}
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
