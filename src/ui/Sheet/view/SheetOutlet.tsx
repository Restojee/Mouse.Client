import { CSSProperties } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectSheetStack } from "../slice";
import { useSheet } from "../viewModel/useSheet";
import { useAppTheme } from "@/hooks/useAppTheme";
import { GlobalTheme } from "@/layout/theme/types";
import SheetEntryRenderer from "@/ui/Sheet/view/SheetEntryRenderer/SheetEntryRenderer";

function themeToVars(t: GlobalTheme): CSSProperties {
  return {
    "--sheet-bg": t.colors.secondaryDark,
    "--sheet-color": t.colors.textOnSecondary,
    "--sheet-border": t.colors.input.border,
  } as CSSProperties;
}

export const SheetOutlet = () => {
  const stack = useAppSelector(selectSheetStack);
  const { close } = useSheet();
  const { theme } = useAppTheme();
  const vars = themeToVars(theme);

  if (stack.length === 0) return null;

  return (
    <>
      {stack.map((entry) => (
        <div
          key={entry.id}
          style={vars}
        >
          <SheetEntryRenderer
            entry={entry}
            onClose={() => close(entry.id)}
          />
        </div>
      ))}
    </>
  );
};
