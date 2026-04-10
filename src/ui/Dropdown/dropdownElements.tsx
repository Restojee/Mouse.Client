import React from "react";
import { StyledBox, StyledBoxProps } from "@/ui/Box";
import styles from "./Dropdown.module.scss";

type DropdownWrapperProps = {
  top: string;
  right: string;
};
export const DropdownWrapper = React.forwardRef<
  HTMLDivElement,
  Partial<StyledBoxProps> & DropdownWrapperProps & React.HTMLAttributes<HTMLDivElement>
>(({ top, right, style, ...props }, ref) => (
  <StyledBox
    ref={ref}
    style={{ position: "absolute", top, right, ...style }}
    {...props}
  />
));
DropdownWrapper.displayName = "DropdownWrapper";

type DropdownContainerProps = {
  width: string;
  isOpen?: boolean;
};
export const DropdownContainer = React.forwardRef<
  HTMLDivElement,
  Partial<StyledBoxProps> & DropdownContainerProps & React.HTMLAttributes<HTMLDivElement>
>(({ width, isOpen, style, ...props }, ref) => (
  <StyledBox
    ref={ref}
    style={{
      position: "relative",
      maxWidth: width,
      width,
      backgroundColor: "white",
      borderRadius: 20,
      ...style,
    }}
    {...props}
  />
));
DropdownContainer.displayName = "DropdownContainer";

type DropdownListProps = {
  width?: string;
  isOpen?: boolean;
};
export const DropdownList = React.forwardRef<
  HTMLDivElement,
  Partial<StyledBoxProps> & DropdownListProps & React.HTMLAttributes<HTMLDivElement>
>(({ width, isOpen, className, ...props }, ref) => (
  <StyledBox
    ref={ref}
    className={[styles.list, className].filter(Boolean).join(" ")}
    direction={"column"}
    gap={0}
    {...props}
  />
));
DropdownList.displayName = "DropdownList";

type DropdownItemProps = {
  blockedItem?: boolean;
};
export const DropdownItemStyled = React.forwardRef<
  HTMLDivElement,
  Partial<StyledBoxProps> & DropdownItemProps & React.HTMLAttributes<HTMLDivElement>
>(({ blockedItem, className, ...props }, ref) => (
  <StyledBox
    ref={ref}
    className={[styles.item, blockedItem && styles.itemBlocked, className].filter(Boolean).join(" ")}
    align={"center"}
    padding={"10px 15px"}
    {...props}
  />
));
DropdownItemStyled.displayName = "DropdownItemStyled";
