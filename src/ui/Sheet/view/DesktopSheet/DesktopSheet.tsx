import React from "react";
import clsx from "clsx";
import { Property } from "csstype";

import { Display } from "@/ui/Display";
import { Paper } from "@/ui/Paper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Button } from "@/ui/Button";
import formStyles from "@/ui/Form/Form.module.scss";
import { Typography } from "@/ui/Typography";
import { Box } from "@/ui/Box";
import { useSheetZIndex } from "../../hooks/useSheetZIndex";
import { useClosingAnimation } from "../../hooks/useClosingAnimation";
import { ThemeKey } from "@/layout/theme/types";
import styles from "./DesktopSheet.module.scss";

export type DesktopSheetProps = {
  isOpen?: boolean;
  onClose: () => void;
  onAccess?: () => void;
  accessDisabled?: boolean;
  text?: string;
  title?: string;
  width?: Property.Width<number>;
  height?: Property.Height<number>;
  themeKey?: ThemeKey;
  children?: React.ReactNode;
  withoutTitle?: boolean;
  withoutButtons?: boolean;
  padding?: number;
  style?: React.CSSProperties;
  zIndex?: number;
  withBackdrop?: boolean;
};

export const DesktopSheet = (props: DesktopSheetProps) => {
  const {
    onClose,
    onAccess,
    text,
    title,
    children,
    width,
    height,
    withoutTitle,
    withoutButtons,
    isOpen,
    padding = 30,
    style,
    themeKey,
    withBackdrop = true,
  } = props;
  const { theme } = useAppTheme(themeKey);
  const fallbackZIndex = useSheetZIndex();
  const resolvedZIndex = props.zIndex ?? fallbackZIndex;
  const { visible, closing } = useClosingAnimation(isOpen ?? false);

  const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const sheetWidth = React.useMemo(() => (typeof width === "number" ? `${width}px` : width || "400px"), [width]);
  const sheetHeight = React.useMemo(() => (typeof height === "number" ? `${height}px` : height), [height]);
  const sheetMaxHeight = React.useMemo(
    () => (sheetHeight ? `min(${sheetHeight}, calc(100dvh - 80px))` : "100%"),
    [sheetHeight],
  );

  const overlayClassName = React.useMemo(
    () =>
      clsx(styles.overlay, {
        [styles.closing]: closing,
        [styles.noBackdrop]: !withBackdrop,
      }),
    [closing, withBackdrop],
  );

  const wrapperClassName = React.useMemo(() => clsx(styles.wrapper, { [styles.closing]: closing }), [closing]);

  const overlayStyle = React.useMemo<React.CSSProperties>(
    () => ({ ...style, zIndex: resolvedZIndex }),
    [style, resolvedZIndex],
  );

  const paperStyle = React.useMemo<React.CSSProperties>(
    () => ({
      width: sheetWidth,
      maxWidth: "100%",
      height: sheetHeight,
      maxHeight: sheetMaxHeight,
      ["--sheet-padding" as string]: `${padding}px`,
    }),
    [sheetWidth, sheetHeight, sheetMaxHeight, padding],
  );

  const titleColor = theme.colors.textOnSecondary;
  const hasChildren = Boolean(children);
  const confirmText = text || "Вы действительно уверены?";

  if (!visible) return null;

  return (
    <Box
      className={overlayClassName}
      data-theme={themeKey}
      onMouseDown={onClose}
      style={overlayStyle}
    >
      <Box
        className={wrapperClassName}
        onMouseDown={handleMouseDown}
      >
        <Paper
          style={paperStyle}
          className={styles.paper}
        >
          <Display condition={!withoutTitle}>
            <Typography
              fontSize="18px"
              color={titleColor}
            >
              {title}
            </Typography>
          </Display>
          <Display condition={!hasChildren}>
            <Typography color={titleColor}>{confirmText}</Typography>
          </Display>
          <Display condition={hasChildren}>
            <Box className={styles.childrenColumn}>{children}</Box>
          </Display>
          <Display condition={!withoutButtons}>
            <Box className={formStyles.cardActions}>
              <Button
                label="Отмена"
                color={titleColor}
                bgColor={theme.colors.default.paperAccent}
                onClick={onClose}
              />
              <Button
                color={theme.colors.brandColorContrastText}
                type="submit"
                onClick={onAccess}
                label="Подтвердить"
                disabled={props.accessDisabled}
              />
            </Box>
          </Display>
        </Paper>
      </Box>
    </Box>
  );
};
