import { SheetStoreEntry } from "../../slice";
import { sheetRegistry } from "../../viewModel/sheetRegistry";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileSheet } from "../MobileSheet/MobileSheet";
import { DesktopSheet } from "../DesktopSheet/DesktopSheet";
import { CSSProperties } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { GlobalThemes } from "@/layout/theme/constants";

type SheetEntryRendererProps = {
  entry: SheetStoreEntry;
  onClose: () => void;
};

const SheetEntryRenderer = ({ entry, onClose }: SheetEntryRendererProps) => {
  const isMobile = useIsMobile();
  const { config } = entry;
  const registered = sheetRegistry.get(entry.id);
  const content = registered?.content ?? null;
  const onAccess = registered?.onAccess;
  const { theme } = useAppTheme();
  const sheetTheme = config.themeKey ? GlobalThemes[config.themeKey] : theme;
  const vars = {
    "--sheet-bg": sheetTheme.colors.secondaryDark,
    "--sheet-color": sheetTheme.colors.textOnSecondary,
    "--sheet-border": sheetTheme.colors.input.border,
  } as CSSProperties;

  if (isMobile) {
    return (
      <MobileSheet
        style={vars}
        isOpen={true}
        onClose={onClose}
        title={config.withoutTitle ? undefined : config.title}
        height={config.height}
        noHeader={config.noHeader}
        zIndex={config.zIndex}
        padding={config.padding}
      >
        {content}
      </MobileSheet>
    );
  }

  return (
    <DesktopSheet
      style={vars}
      isOpen={true}
      onClose={onClose}
      onAccess={() => {
        onAccess?.();
        onClose();
      }}
      title={config.title}
      text={config.text}
      width={config.width}
      withoutTitle={config.withoutTitle}
      withoutButtons={config.withoutButtons}
      accessDisabled={config.accessDisabled}
      padding={config.padding}
    >
      {content}
    </DesktopSheet>
  );
};
export default SheetEntryRenderer;
