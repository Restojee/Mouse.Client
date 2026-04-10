import { CloseIcon } from "@/svg/CloseIcon";
import { IconButton } from "@/ui/Button/IconButton";
import React from "react";
import styles from "./ModalCloseIcon.module.scss";

type CloseIconPropsType = {
  onClick?: () => void;
  size?: number;
  color?: string;
};
export const ModalCloseIcon = ({ onClick }: CloseIconPropsType) => {
  return (
    <div className={styles.closeIcon}>
      <IconButton onClick={onClick}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};
