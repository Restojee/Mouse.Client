import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useZindexContext } from "@/hooks/useZindexContext";
import { GlobalThemes } from "@/layout/theme/constants";
import { ThemeKey } from "@/layout/theme/types";
import { AnySheetInstance } from "../core/sheetData";

const MOBILE_ANIM_MS = 350;
const DESKTOP_ANIM_MS = 180;

export type SheetProviderProps = {
  instance: AnySheetInstance;
  onClose: (result?: unknown) => void;
};

type UseSheetProviderResult = {
  isMobile: boolean;
  isOpen: boolean;
  zIndex: number;
  vars: CSSProperties;
  dataTheme: ThemeKey | undefined;
  shouldRender: boolean;
  handleClose: (result?: unknown) => void;
  handleCloseVoid: () => void;
  handleAccess: () => void;
};

export const useSheetProvider = (props: SheetProviderProps): UseSheetProviderResult => {
  const { instance, onClose } = props;
  const zIndex = useZindexContext();
  const { config } = instance;
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

  const shouldRender = !(config.onlyMobile && !isMobile);

  const vars = useMemo(
    (): CSSProperties =>
      ({
        "--sheet-bg": sheetTheme.colors.secondaryDark,
        "--sheet-color": sheetTheme.colors.textOnSecondary,
        "--sheet-border": sheetTheme.colors.input.border,
      }) as CSSProperties,
    [sheetTheme],
  );

  const dataTheme = config.themeKey ?? undefined;

  return {
    isMobile,
    isOpen,
    zIndex,
    vars,
    dataTheme,
    shouldRender,
    handleClose,
    handleCloseVoid,
    handleAccess,
  };
};
