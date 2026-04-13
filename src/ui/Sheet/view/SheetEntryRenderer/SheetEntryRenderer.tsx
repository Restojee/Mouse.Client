import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useZindexContext } from "@/hooks/useZindexContext";
import { GlobalThemes } from "@/layout/theme/constants";
import { AnySheetInstance } from "../../core/sheetData";
import { MobileSheet } from "../MobileSheet/MobileSheet";
import { DesktopSheet } from "../DesktopSheet/DesktopSheet";

const MOBILE_ANIM_MS = 350;
const DESKTOP_ANIM_MS = 180;

type SheetEntryRendererProps = {
  instance: AnySheetInstance;
  onClose: (result?: unknown) => void;
};

const SheetEntryRenderer = ({ instance, onClose }: SheetEntryRendererProps) => {
  const zIndex = useZindexContext();
  const { component: Component, props, config } = instance;
  const isMobile = useIsMobile();
  const { theme } = useAppTheme();
  const sheetTheme = config.themeKey ? GlobalThemes[config.themeKey] : theme;

  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsOpen(true));
    return () => {
      cancelAnimationFrame(raf);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleClose = useCallback(
    (result?: unknown) => {
      setIsOpen(false);
      const delay = isMobile ? MOBILE_ANIM_MS : DESKTOP_ANIM_MS;
      closeTimerRef.current = setTimeout(() => onClose(result), delay);
    },
    [isMobile, onClose],
  );

  const handleCloseVoid = useCallback(() => handleClose(undefined), [handleClose]);
  const handleAccess = useCallback(() => handleClose(true), [handleClose]);

  const vars = useMemo<CSSProperties>(
    () =>
      ({
        "--sheet-bg": sheetTheme.colors.secondaryDark,
        "--sheet-color": sheetTheme.colors.textOnSecondary,
        "--sheet-border": sheetTheme.colors.input.border,
      }) as CSSProperties,
    [sheetTheme],
  );

  const dataTheme = config.themeKey ?? undefined;
  const content = (
    <Component
      {...props}
      onClose={handleClose}
    />
  );

  if (isMobile) {
    return (
      <MobileSheet
        style={vars}
        data-theme={dataTheme}
        isOpen={isOpen}
        onClose={handleCloseVoid}
        title={config.withoutTitle ? undefined : config.title}
        height={config.height}
        noHeader={config.noHeader}
        padding={config.padding}
        zIndex={zIndex}
        withBackdrop={true}
      >
        {content}
      </MobileSheet>
    );
  }

  return (
    <DesktopSheet
      style={vars}
      data-theme={dataTheme}
      isOpen={isOpen}
      onClose={handleCloseVoid}
      onAccess={handleAccess}
      title={config.title}
      text={config.text}
      width={config.width}
      withoutTitle={config.withoutTitle}
      withoutButtons={config.withoutButtons}
      accessDisabled={config.accessDisabled}
      padding={config.padding}
      zIndex={zIndex}
      withBackdrop={true}
    >
      {content}
    </DesktopSheet>
  );
};

export default SheetEntryRenderer;
