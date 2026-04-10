import { useAppTheme } from "@/hooks/useAppTheme";
import { StyledBox, StyledBoxProps } from "@/ui/Box";
import React from "react";

type PaperPropsType = Partial<StyledBoxProps> & {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
};
export const Paper = ({ children, onClick, ...props }: PaperPropsType) => {
  const { theme } = useAppTheme();

  return (
    <StyledBox
      onClick={onClick}
      direction={"column"}
      textAlign={"center"}
      align={"center"}
      width={"100%"}
      borderRadius={theme.blockSettings.siteBorder}
      height={"100%"}
      padding={"30px"}
      maxHeight={"100%"}
      zIndex={theme.order.modal}
      bgColor={"rgba(0, 0, 0, 0.03)"}
      {...props}
    >
      {children}
    </StyledBox>
  );
};
