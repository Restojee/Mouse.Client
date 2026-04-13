import React from "react";
import { Property } from "csstype";
import styles from "./Typography.module.scss";

type Props = {
  textAlign?: Property.TextAlign;
  fontWeight?: Property.FontWeight;
  size?: Property.FontSize<number>;
  opacity?: Property.Opacity;
  margin?: Property.Margin<number>;
  fontSize?: Property.FontSize<number>;
  isEllipsis?: boolean;
  isUpperCase?: boolean;
  isLink?: boolean;
  isClickable?: boolean;
  isUnselectable?: boolean;
  color?: string;
  children?: React.ReactNode;
  className?: string;
};

export const Typography = React.forwardRef<HTMLParagraphElement, Props & React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const {
      textAlign,
      fontWeight,
      opacity,
      margin,
      fontSize,
      color,
      isEllipsis,
      isUpperCase,
      isLink,
      isClickable,
      isUnselectable,
      ...htmlProps
    } = props;

    const classes = [styles.typography, className];
    if (isEllipsis) classes.push(styles.ellipsis);
    if (isUpperCase) classes.push(styles.uppercase);
    if (isLink) classes.push(styles.link);
    if (isClickable) classes.push(styles.clickable);
    if (isUnselectable) classes.push(styles.unselectable);

    const style: React.CSSProperties = {
      textAlign,
      fontWeight,
      opacity,
      margin,
      fontSize,
      color,
    };

    return (
      <p
        ref={ref}
        className={classes.filter(Boolean).join(" ")}
        style={style}
        {...htmlProps}
      >
        {children}
      </p>
    );
  },
);

Typography.displayName = "Typography";
