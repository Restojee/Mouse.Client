import { ThemeSizes } from '@common/themes/common/types';
import { ThemeTokens } from "@common/themes/common/variables";

export enum EIcon {

}
export interface IconProps {
  icon?: EIcon | string;
  size?: ThemeSizes;
  color?: ThemeTokens;
}
