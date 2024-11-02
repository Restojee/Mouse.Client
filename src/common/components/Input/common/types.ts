import type * as React from 'react';
import { CardColorKey } from '@common/themes/common/types';

export interface TextInputProps {
  readOnly?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bgColor?: CardColorKey;
  color?: CardColorKey;
  value?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
  className?: string;
  placeholder?: string;
  leftIcon?: string;
  rightIcon?: string;
  integrated?: boolean;
  noBorder?: boolean;
  noHover?: boolean;
}
