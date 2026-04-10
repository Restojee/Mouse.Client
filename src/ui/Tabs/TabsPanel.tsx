import React from "react";
import styles from "./Tabs.module.scss";

type Props = {
  activeIndex: number;
  children: React.ReactNode[];
};

export const TabsPanel = ({ activeIndex, children }: Props) => {
  const count = children.length;

  return (
    <div className={styles.viewport}>
      <div
        className={styles.track}
        style={{
          width: `${count * 100}%`,
          transform: `translateX(-${(activeIndex / count) * 100}%)`,
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className={styles.slide}
            style={{ width: `${100 / count}%` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
