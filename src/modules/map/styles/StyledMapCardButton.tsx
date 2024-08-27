import { Property } from "csstype";
import styled from "styled-components";

type MapsCardButtonProps = {
  justify?: Property.JustifyContent;
  isHover?: boolean;
};
export const StyledMapCardButton = styled.div<MapsCardButtonProps>((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  opacity: props.isHover ? 1 : 0,
  position: "absolute",
  transition: " 0.2s",
  zIndex: 1,
}));
