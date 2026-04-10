import React from "react";
import { Property } from "csstype";

import { Display } from "@/ui/Display";
import { Paper } from "@/ui/Paper";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Button } from "@/ui/Button";
import formStyles from "@/ui/Form/Form.module.scss";
import { Typography } from "@/ui/Typography";
import { useSheetZIndex } from "../../viewModel/useSheetZIndex";
import { useClosingAnimation } from "../../viewModel/useClosingAnimation";
import { GlobalThemes } from "@/layout/theme/constants";
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
  theme?: ThemeKey;
  children?: React.ReactNode;
  withoutTitle?: boolean;
  withoutButtons?: boolean;
  padding?: number;
  style?: React.CSSProperties;
};

export const DesktopSheet = (props: DesktopSheetProps) => {
  const { onClose, onAccess, text, title, children, width, withoutTitle, withoutButtons, isOpen, padding, style } =
    props;
  const { theme: appTheme } = useAppTheme();
  const theme = props.theme ? GlobalThemes[props.theme] : appTheme;
  const zIndex = useSheetZIndex();
  const { visible, closing } = useClosingAnimation(isOpen ?? false);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay}${closing ? ` ${styles.closing}` : ""}`}
      style={{ ...style, zIndex }}
      onMouseDown={onClose}
    >
      <div
        className={`${styles.wrapper}${closing ? ` ${styles.closing}` : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Paper
          height="auto"
          gap={20}
          padding={padding ?? 30}
          width={width || 400}
          bgColor={theme.colors.secondaryDark}
        >
          <Display condition={!withoutTitle}>
            <Typography
              fontSize="18px"
              color={theme.colors.textOnSecondary}
            >
              {title}
            </Typography>
          </Display>
          <Display condition={!children}>
            <Typography color={theme.colors.textOnSecondary}>{text || "Вы действительно уверены?"}</Typography>
          </Display>
          <Display condition={children}>
            <div className={styles.childrenColumn}>{children}</div>
          </Display>
          <Display condition={!withoutButtons}>
            <div className={formStyles.cardActions}>
              <Button
                label="Отмена"
                color={theme.colors.textOnSecondary}
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
            </div>
          </Display>
        </Paper>
      </div>
    </div>
  );
};
