import * as React from "react";
import { ModalCloseIcon } from "@/ui/ModalCloseIcon/ModalCloseIcon";
import { useDragToClose } from "../../viewModel/useDragToClose";
import { useSheetZIndex } from "../../viewModel/useSheetZIndex";
import styles from "./MobileSheet.module.scss";

export type MobileSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  zIndex?: number;
  height?: number | string;
  noHeader?: boolean;
  padding?: number;
  style?: React.CSSProperties;
};

export const MobileSheet: React.FC<MobileSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  zIndex,
  height,
  padding,
  style,
  noHeader = false,
}) => {
  const autoZIndex = useSheetZIndex();
  const resolvedZIndex = zIndex ?? autoZIndex;

  const sheetRef = React.useRef<HTMLDivElement>(null);
  const handleBarRef = React.useRef<HTMLDivElement>(null);

  useDragToClose(sheetRef, handleBarRef, onClose, isOpen);

  return (
    <div
      className={`${styles.overlay}${isOpen ? ` ${styles.open}` : ""}`}
      style={{ ...style, zIndex: resolvedZIndex, padding }}
    >
      <div
        className={`${styles.backdrop}${isOpen ? ` ${styles.open}` : ""}`}
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        className={`${styles.container}${isOpen ? ` ${styles.open}` : ""}`}
        style={{ height }}
      >
        <div
          ref={handleBarRef}
          className={styles.handleBar}
        >
          <div className={styles.handleBarPill} />
        </div>
        {!noHeader && (
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            <ModalCloseIcon onClick={onClose} />
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
