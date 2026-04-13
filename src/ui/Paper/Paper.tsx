import React, { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Paper.module.scss";

type PaperPropsType = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Paper = ({ children, className, style, onClick, onMouseDown }: PaperPropsType) => {
  return (
    <div
      className={clsx(styles.root, className)}
      style={style}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};
