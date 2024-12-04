import { FlexProps } from '@/common';

export interface PaperProps extends Pick<FlexProps, 'children' | 'className' | 'onClick'>{
  bgColor?: string;
  bgImage?: string;
  color?: string;
  radius?: number;
}