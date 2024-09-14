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
      flex={"column"}
      textAlign={"center"}
      align={"center"}
      boxShadow={"0 0 100px 1px rgba(0, 0, 0, 1)"}
      width={"100%"}
      borderRadius={theme.blockSettings.siteBorder}
      height={"100%"}
      padding={"30px"}
      maxHeight={"100%"}
      bgColor={theme.colors.default.paper}
      zIndex={theme.order.modal}
      {...props}
    >
      {children}
    </StyledBox>
  );
};
