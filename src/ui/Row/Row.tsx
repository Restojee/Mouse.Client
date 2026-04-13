import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";
import clsx from "clsx";
import { Property } from "csstype";
import rowStyles from "./Row.module.scss";

type RowProps = HTMLAttributes<HTMLDivElement> & {
  gap?: Property.Gap<string | number>;
  align?: Property.AlignItems;
  justify?: Property.JustifyContent;
  width?: Property.Width<string | number>;
  fullWidth?: boolean;
  wrap?: Property.FlexWrap;
};

export const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ gap, align, justify, width, fullWidth, wrap, className, style, children, ...rest }, ref) => {
    const mergedStyle: CSSProperties = {
      gap,
      alignItems: align,
      justifyContent: justify,
      width: fullWidth ? "100%" : width,
      flexWrap: wrap,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={clsx(rowStyles.row, className)}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Row.displayName = "Row";
