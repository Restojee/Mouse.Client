import React from "react";
import styles from "./ScrollBox.module.scss";

type ScrollBoxPropsType = {
  children: React.ReactNode;
};

export const ScrollBox = ({ children }: ScrollBoxPropsType) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
