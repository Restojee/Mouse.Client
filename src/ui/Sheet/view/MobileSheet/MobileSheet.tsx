import * as React from "react";
import clsx from "clsx";
import { Typography } from "@/ui/Typography";
import { useDragToClose } from "../../viewModel/useDragToClose";
import { useSheetZIndex } from "../../viewModel/useSheetZIndex";
import { ThemeKey } from "@/layout/theme/types";
import styles from "./MobileSheet.module.scss";

export type MobileSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  height?: number | string;
  noHeader?: boolean;
  padding?: number;
  style?: React.CSSProperties;
  themeKey?: ThemeKey;
  zIndex?: number;
  withBackdrop?: boolean;
  snapPoints?: number[];
};

export const MobileSheet: React.FC<MobileSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
  height,
  padding,
  style,
  themeKey,
  noHeader = false,
  zIndex: zIndexProp,
  withBackdrop = true,
  snapPoints,
}) => {
  const fallbackZIndex = useSheetZIndex();
  const resolvedZIndex = zIndexProp ?? fallbackZIndex;

  const sheetRef = React.useRef<HTMLDivElement>(null);
  const handleBarRef = React.useRef<HTMLDivElement>(null);

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [isOpen]);

  useDragToClose(sheetRef, handleBarRef, onClose, isOpen, snapPoints);

  const overlayStyle = React.useMemo<React.CSSProperties>(
    () => ({ ...style, zIndex: resolvedZIndex, padding }),
    [style, resolvedZIndex, padding],
  );

  const containerStyle = React.useMemo<React.CSSProperties>(() => ({ height }), [height]);

  const overlayClassName = clsx(styles.overlay, { [styles.open]: visible });
  const backdropClassName = clsx(styles.backdrop, { [styles.open]: visible });
  const containerClassName = clsx(styles.container, { [styles.open]: visible });

  return (
    <div
      className={overlayClassName}
      style={overlayStyle}
      data-theme={themeKey}
    >
      {withBackdrop && (
        <div
          className={backdropClassName}
          onClick={onClose}
        />
      )}
      <div
        ref={sheetRef}
        className={containerClassName}
        style={containerStyle}
      >
        <div
          ref={handleBarRef}
          className={styles.handleBar}
        >
          <div className={styles.handleBarPill} />
        </div>
        {!noHeader && (
          <div className={styles.header}>
            <Typography className={styles.title}>{title}</Typography>
          </div>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
