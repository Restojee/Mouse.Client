import { ThemeColorKey, ThemeSizes } from "@common/themes/common/types";
import { FlexProps } from "@ui/Layout";

export interface PaperProps extends Pick<FlexProps, 'children' | 'className' | 'onClick' | 'nonIntegration'>{
  bgColor?: ThemeColorKey;
  bgImage?: string;
  color?: ThemeColorKey;
  radius?: ThemeSizes | 'none';
}
