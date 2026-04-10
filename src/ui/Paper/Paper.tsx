import { StyledBox, StyledBoxProps } from "@/ui/Box";
import React from "react";

type PaperPropsType = Partial<StyledBoxProps> & {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
};
export const Paper = ({ children, onClick, ...props }: PaperPropsType) => {
  return (
    <StyledBox
      onClick={onClick}
      direction={"column"}
      textAlign={"center"}
      align={"center"}
      width={"100%"}
      borderRadius={15}
      height={"100%"}
      padding={"30px"}
      maxHeight={"100%"}
      zIndex={"var(--z-modal)"}
      bgColor={"var(--color-secondary)"}
      {...props}
    >
      {children}
    </StyledBox>
  );
};
