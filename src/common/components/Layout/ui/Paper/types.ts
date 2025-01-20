import { FlexProps } from '@/common';
import { ThemeColorKey, ThemeSizes } from "@common/themes/common/types";

export interface PaperProps extends Pick<FlexProps, 'children' | 'className' | 'onClick'>{
  bgColor?: ThemeColorKey;
  bgImage?: string;
  color?: ThemeColorKey;
  radius?: ThemeSizes;
}