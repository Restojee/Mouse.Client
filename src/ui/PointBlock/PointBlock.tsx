import { StyledBox } from "@/ui/Box";
import React from "react";
import { Property } from "csstype";
import { StyledPointBlockContainer, StyledPointBlockFooter } from "@/ui/PointBlock/styled";

type PointBlockViewPropsType = {
  header: string;
  children: React.ReactNode;
  width: Property.Width<number>;
  left: Property.Left;
  right: Property.Right;
  bottom: Property.Bottom;
  footer: React.ReactNode;
  isVisible: boolean;
  centeredTitle: boolean;
};

export function PointBlock(props: Partial<PointBlockViewPropsType>) {
  return (
    <StyledPointBlockContainer
      isVisible={props.isVisible}
      left={props.left}
      right={props.right}
      width={props.width}
      bottom={props.bottom}
    >
      <StyledBox
        justify={props.centeredTitle ? "center" : "initial"}
        margin={"0 0 15px 0"}
        textAlign={props.centeredTitle ? "center" : "initial"}
      >
        {props.header}
      </StyledBox>
      <StyledBox gap={20}>{props.children}</StyledBox>
      <StyledPointBlockFooter>{props.footer}</StyledPointBlockFooter>
    </StyledPointBlockContainer>
  );
}
