import React, { memo, ReactNode } from "react";
import { Typography } from "@/ui/Typography";
import styles from "./Header.module.scss";

type HeaderInfoItemPropsType = {
  icon: ReactNode;
  title: string;
  count?: number;
};

export const HeaderInfoItem = memo(({ icon, title, count }: HeaderInfoItemPropsType) => {
  return (
    <div
      className={styles.infoItem}
      title={title}
    >
      {icon}
      <Typography>{count}</Typography>
    </div>
  );
});

HeaderInfoItem.displayName = "HeaderInfoItem";
