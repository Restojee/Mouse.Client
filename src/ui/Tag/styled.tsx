import React from "react";
import { StyledBox, StyledBoxProps } from "@/ui/Box";
import { Property } from "csstype";
import styles from "./Tag.module.scss";

/** @deprecated Use CSS module classes directly */
export const StyledMapContentTags = StyledBox;

type StyledTagType = {
  bgColor?: Property.BackgroundColor;
  chips?: boolean;
  isActive?: boolean;
  small?: boolean;
};
/** @deprecated Use CSS module classes directly */
export const StyledTag = React.forwardRef<
  HTMLDivElement,
  Partial<StyledBoxProps> & StyledTagType & React.HTMLAttributes<HTMLDivElement>
>(({ chips, isActive, small, bgColor, className, style, ...props }, ref) => {
  const classes = [styles.tag, className];
  if (chips) classes.push(styles.chips);
  if (isActive) classes.push(styles.active);
  if (small) classes.push(styles.small);

  return (
    <StyledBox
      ref={ref}
      className={classes.filter(Boolean).join(" ")}
      style={{
        backgroundColor: isActive ? undefined : (bgColor || "var(--color-neutral)"),
        ...style,
      }}
      {...props}
    />
  );
});
StyledTag.displayName = "StyledTag";
