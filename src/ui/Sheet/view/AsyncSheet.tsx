import { CSSProperties, Suspense } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileSheet, MobileSheetProps } from "./MobileSheet/MobileSheet";
import { DesktopSheet, DesktopSheetProps } from "./DesktopSheet/DesktopSheet";
import { useAppTheme } from "@/hooks/useAppTheme";
import { GlobalThemes } from "@/layout/theme/constants";

export type AsyncSheetProps = MobileSheetProps & DesktopSheetProps;

export const AsyncSheet = (props: AsyncSheetProps) => {
  const isMobile = useIsMobile();
  const { theme } = useAppTheme();
  if (!props.isOpen) {
    return null;
  }

  const sheetTheme = props.theme ? GlobalThemes[props.theme] : theme;
  const themeColors = {
    "--sheet-bg": sheetTheme.colors.secondaryDark,
    "--sheet-color": sheetTheme.colors.textOnSecondary,
    "--sheet-border": sheetTheme.colors.input.border,
  } as CSSProperties;

  if (isMobile) {
    return (
      <MobileSheet
        isOpen
        style={themeColors}
        onClose={props.onClose}
        title={props.withoutTitle ? undefined : props.title}
        height={props.height}
        noHeader={props.noHeader}
        zIndex={props.zIndex}
        padding={props.padding}
      >
        {props.children}
      </MobileSheet>
    );
  }

  return (
    <Suspense fallback={null}>
      <DesktopSheet
        style={themeColors}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onAccess={props.onAccess}
        title={props.title}
        text={props.text}
        width={props.width}
        theme={props.theme}
        withoutTitle={props.withoutTitle}
        withoutButtons={props.withoutButtons}
        accessDisabled={props.accessDisabled}
        padding={props.padding}
      >
        {props.children}
      </DesktopSheet>
    </Suspense>
  );
};
