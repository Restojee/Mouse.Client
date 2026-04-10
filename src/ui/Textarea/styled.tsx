import React from "react";
import { Property } from "csstype";
import styles from "./Textarea.module.scss";

type StyledTextareaType = {
  bgColor?: Property.BackgroundColor;
  height?: Property.Height;
};
/** @deprecated Use CSS module classes directly */
export const StyledTextarea = React.forwardRef<
  HTMLTextAreaElement,
  StyledTextareaType & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ bgColor, height, className, style, ...htmlProps }, ref) => (
  <textarea
    ref={ref}
    className={[styles.textarea, className].filter(Boolean).join(" ")}
    style={{
      backgroundColor: bgColor || "var(--color-input-default)",
      height: height || "100px",
      minHeight: height || "100px",
      ...style,
    }}
    {...htmlProps}
  />
));

StyledTextarea.displayName = "StyledTextarea";
