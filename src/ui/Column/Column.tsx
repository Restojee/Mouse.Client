import React, { forwardRef, HTMLAttributes, CSSProperties } from "react";
import clsx from "clsx";
import { Property } from "csstype";
import columnStyles from "./Column.module.scss";

type ColumnProps = HTMLAttributes<HTMLDivElement> & {
  gap?: Property.Gap<string | number>;
  align?: Property.AlignItems;
  justify?: Property.JustifyContent;
  width?: Property.Width<string | number>;
  fullWidth?: boolean;
};

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ gap, align, justify, width, fullWidth, className, style, children, ...rest }, ref) => {
    const mergedStyle: CSSProperties = {
      gap,
      alignItems: align,
      justifyContent: justify,
      width: fullWidth ? "100%" : width,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={clsx(columnStyles.column, className)}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Column.displayName = "Column";
