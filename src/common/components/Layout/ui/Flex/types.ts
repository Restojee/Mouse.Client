import * as React from 'react';
import { ColorKey, ThemeSizes } from '@common/themes/common/types';

export type Justify = 'center' | 'start' | 'end' | 'between' | 'around';
export type Align = 'center' | 'start' | 'end';
export type Direction = 'row' | 'column';
export type Gap = number;
export type Wrap = string;

export interface MouseEvents {
  onClick?: React.MouseEventHandler;
  onDragStart?: React.DragEventHandler;
  onDragEnd?: React.DragEventHandler;
  onDragLeave?: React.DragEventHandler;
  onDragOver?: React.DragEventHandler;
  onDrop?: React.DragEventHandler;
}

export interface FlexProps extends MouseEvents, GeoProps {
  element?: JSX.ElementType;
  className?: string;
  bgColor?: ColorKey | string;
  color?: ColorKey | string;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
  direction?: Direction;
  width?: number;
  height?: number;
}

export type Sizes =
  | "sm"
  | "md"
  | "lg"

export interface GeoProps {
  gutter?: Gap;
  wrap?: Wrap;
  gap?: number;
  rowGap?: number;
  colGap?: number;
  justify?: Justify;
  align?: Align;
  pa?: Sizes;
}