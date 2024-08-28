import styled from "styled-components";
import { Property } from "csstype";
import { Typography } from "@/ui/Typography/styles/Typography";

type StyledIconContainerPropsTypes = {
  opacity?: Property.Opacity;
  margin?: Property.Margin;
  padding?: Property.Padding;
  right?: Property.Right;
};
export const StyledIconContainer = styled.div<StyledIconContainerPropsTypes>((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: props.margin,
  padding: props.padding,
  opacity: props.opacity,
  position: "relative",
  ...(props.right && {
    marginLeft: "auto",
    backgroundColor: "red",
  }),
}));

export const StyledIconText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: -20,
  fontSize: `calc(${theme.font.fontSize} - 2px)`,
  opacity: 0.6,
}));
