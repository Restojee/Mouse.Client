import styled from "styled-components";
import { StyledBox } from "@/ui/Box";

type DropdownWrapperProps = {
  top: string;
  right: string;
};

type DropdownContainerProps = {
  width: string;
  isOpen?: boolean;
};

type DropdownListProps = {
  width?: string;
  isOpen?: boolean;
};

type DropdownItemProps = {
  blockedItem?: boolean;
};

export const DropdownWrapper = styled(StyledBox)<DropdownWrapperProps>(({ top, right }) => ({
  position: "absolute",
  top: top,
  right: right,
}));

export const DropdownContainer = styled(StyledBox)<DropdownContainerProps>(({ width }) => ({
  position: "relative",
  maxWidth: width,
  width: width,
  backgroundColor: "white",
  borderRadius: 20,
}));

export const DropdownList = styled(StyledBox)<DropdownListProps>(({ theme }) => ({
  flexDirection: "column",
  gap: 0,
  rowGap: 0,
  columnGap: 0,
  position: "absolute",
  top: "50px",
  backgroundColor: theme.colors.secondary,
  zIndex: theme.order.dropdown,
  borderRadius: "10px",
  color: theme.colors.textOnSecondary,
  boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.3)",
  width: "100%",
  overflow: "hidden",
  transition: "0.2s",
  maxHeight: "300px",
}));

export const DropdownItemStyled = styled(StyledBox)<DropdownItemProps>(({ blockedItem }) => ({
  alignItems: "center",
  padding: "10px 15px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  svg: {
    width: "18px",
    height: "18px",
  },
  ...(blockedItem && {
    cursor: "default",
    "&:hover": {
      backgroundColor: "initial",
    },
  }),
}));
