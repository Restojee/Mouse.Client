import { FlexProps } from '@/common';
import { Sizes } from "@ui/Layout/ui/Flex/types";

export interface PaperProps extends Pick<FlexProps, 'children' | 'className' | 'onClick'>{
  bgColor?: string;
  bgImage?: string;
  color?: string;
  radius?: Sizes;
}