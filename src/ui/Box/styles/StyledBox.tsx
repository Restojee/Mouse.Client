import { Property } from "csstype";
import React from "react";

export type StyledBoxProps = {
  direction: Property.FlexDirection;
  align: Property.AlignItems;
  borderRadius: Property.BorderRadius<number>;
  justify: Property.JustifyContent;
  position: Property.Position;
  gap: Property.RowGap<number>;
  margin: Property.Margin<number>;
  padding: Property.Padding<number>;
  bgColor: Property.BackgroundColor;
  border: Property.Border;
  maxWidth: Property.MaxWidth<number>;
  minWidth: Property.MinWidth<number>;
  minHeight: Property.MinHeight<number>;
  color: Property.Color;
  width: Property.Width<number>;
  height: Property.Height<number>;
  opacity: Property.Opacity;
  overflow: Property.Overflow;
  wrap: Property.FlexWrap;
  transform: Property.Transform;
  transition: Property.Transition;
  grow: Property.FlexGrow;
  cursor: Property.Cursor;
  textAlign: Property.TextAlign;
  fontSize: Property.FontSize;
  fontWeight: Property.FontWeight;
  boxShadow: Property.BoxShadow;
  display: Property.Display;
  zIndex: Property.ZIndex;
  borderBottom: Property.BorderBottom;
  gridTemplateColumns: Property.GridTemplateColumns;
  flex: Property.Flex;
  maxHeight: Property.MaxHeight;

  isClickable: boolean;
  isActive: boolean;
  bgColorByActive: string;
  stylized: boolean;
  children: React.ReactNode;
  className: string;
};

const stylePropKeys = new Set([
  "direction", "align", "borderRadius", "justify", "position", "gap",
  "margin", "padding", "bgColor", "border", "maxWidth", "minWidth",
  "minHeight", "color", "width", "height", "opacity", "overflow",
  "wrap", "transform", "transition", "grow", "cursor", "textAlign",
  "fontSize", "fontWeight", "boxShadow", "display", "zIndex",
  "borderBottom", "gridTemplateColumns", "flex", "maxHeight",
  "isClickable", "isActive", "bgColorByActive", "stylized",
]);

/** @deprecated Use plain `<div>` with inline styles or CSS module classes instead */
export const StyledBox = React.forwardRef<
  HTMLDivElement,
  Partial<StyledBoxProps> & React.HTMLAttributes<HTMLDivElement>
>(({ children, className, style, ...props }, ref) => {
  const {
    direction, align, borderRadius, justify, position, gap,
    margin, padding, bgColor, border, maxWidth, minWidth,
    minHeight, color, width, height, opacity, overflow,
    wrap, transform, transition, grow, cursor, textAlign,
    fontSize, fontWeight, boxShadow, display, zIndex,
    borderBottom, gridTemplateColumns, flex, maxHeight,
    stylized,
    ...htmlProps
  } = props as Partial<StyledBoxProps> & Record<string, unknown>;

  // Filter out custom props that shouldn't go to DOM
  const cleanHtmlProps: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(htmlProps)) {
    if (!stylePropKeys.has(key)) {
      cleanHtmlProps[key] = value;
    }
  }

  const computedStyle: React.CSSProperties = {
    display: display || "flex",
    flexDirection: direction || "row",
    alignItems: align,
    flex,
    boxShadow,
    justifyContent: justify,
    gap,
    gridTemplateColumns,
    rowGap: gap,
    margin,
    padding,
    backgroundColor: bgColor,
    border,
    textAlign,
    fontSize,
    fontWeight,
    color,
    borderRadius,
    maxWidth,
    maxHeight,
    minHeight,
    minWidth,
    width,
    height,
    opacity,
    position,
    overflow,
    flexGrow: grow,
    flexWrap: wrap,
    borderBottom,
    columnGap: gap,
    transform,
    transition,
    cursor,
    zIndex,
    ...(stylized && {
      padding: padding ?? 15,
      borderRadius: borderRadius ?? 10,
      backgroundColor: bgColor || "var(--color-primary)",
    }),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={computedStyle}
      {...cleanHtmlProps}
    >
      {children}
    </div>
  );
});

StyledBox.displayName = "StyledBox";
