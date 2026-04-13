import React from "react";
import { Box } from "@/ui/Box";
import { IconButton } from "@/ui/Button/IconButton";

type PropsType = {
  isContentVisible?: boolean;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "submit";
};
export const PagePanelItem = (props: PropsType) => {
  const { isContentVisible, content, children, onClick, disabled, type } = props;

  return (
    <Box gap={10}>
      {isContentVisible ? content : null}
      {!!children && (
        <IconButton
          isPanel
          type={type || "button"}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </IconButton>
      )}
    </Box>
  );
};

export default PagePanelItem;
