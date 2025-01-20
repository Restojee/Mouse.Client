import type * as React from 'react';
import { ThemeColorKey } from '@common/themes/common/types';

export interface ButtonProps extends CoreButtonProps {
  color?: ThemeColorKey;
  label?: string;
  append?: React.ReactElement;
  prepend?: React.ReactElement;
}

export interface CoreButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  hint?: string;
  pressed?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
}

export interface CancelButtonProps extends ButtonProps {}
export interface IconButtonProps extends ButtonProps {}
export interface SubmitButtonProps extends ButtonProps {}
