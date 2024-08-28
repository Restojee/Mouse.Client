import { CloseIcon } from "@/svg/CloseIcon";
import { IconButton } from "@/ui/Button/IconButton";
import React from "react";
import { StyledModalCloseIcon } from "./styles";

type CloseIconPropsType = {
  onClick?: () => void;
  size?: number;
  color?: string;
};
export const ModalCloseIcon = ({ onClick }: CloseIconPropsType) => {
  return (
    <StyledModalCloseIcon>
      <IconButton onClick={onClick}>
        <CloseIcon />
      </IconButton>
    </StyledModalCloseIcon>
  );
};
