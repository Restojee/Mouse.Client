import React from "react";
import { Typography } from "@/ui/Typography/styles/Typography";
import styles from "./Statistic.module.scss";

type StyledStatisticIconContainerPropsType = {
  fillingPercent?: string;
};
export const StyledStatisticIconContainer = React.forwardRef<
  HTMLDivElement,
  StyledStatisticIconContainerPropsType & React.HTMLAttributes<HTMLDivElement>
>(({ fillingPercent, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.statisticIconContainer, className].filter(Boolean).join(" ")}
    style={{
      background: `linear-gradient(to top, rgb(132, 208, 108) ${fillingPercent}, var(--color-secondary) ${fillingPercent})`,
      ...style,
    }}
    {...props}
  />
));
StyledStatisticIconContainer.displayName = "StyledStatisticIconContainer";

export const StyledStatisticIconText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <Typography
    ref={ref}
    className={[styles.statisticIconText, className].filter(Boolean).join(" ")}
    {...props}
  />
));
StyledStatisticIconText.displayName = "StyledStatisticIconText";
