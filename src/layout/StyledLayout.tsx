import React from "react";
import styles from "./Layout.module.scss";

export const Layout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.layout, className].filter(Boolean).join(" ")} {...props} />
  ),
);
Layout.displayName = "Layout";

export const Wrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.wrapper, className].filter(Boolean).join(" ")} {...props} />
  ),
);
Wrapper.displayName = "Wrapper";
