import styled from "styled-components";
import { Property } from "csstype";

export type StyledButtonIconProps = {
  isCircle?: boolean;
  opacity?: Property.Opacity;
  margin?: Property.Margin;
  padding?: Property.Padding;
};
export const StyledButtonIcon = styled.div<StyledButtonIconProps>((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  opacity: props.opacity,
  margin: props.margin,
  padding: props.padding,
  transition: "0.2s",
  transitionProperty: "transform",
  "&:hover": {
    transform: "scale(0.92)",
  },
  ...(props.isCircle && {
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: "min-content",
    borderRadius: "50%",
    padding: 2,
  }),
}));
