import styled, { CSSObject } from "styled-components";
import { Property } from "csstype";

type StyledIconButtonPropsType = {
  opacity?: Property.Opacity;
  margin?: Property.Margin;
  padding?: Property.Padding;
  right?: Property.Right;
  isAdmin?: boolean;
  isStylized?: boolean;
};
export const IconButton = styled.button<StyledIconButtonPropsType>(({ theme, ...props }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  margin: props.margin,
  color: "inherit",
  opacity: props.opacity || 0.7,
  padding: props.padding,
  transition: "0.2s",
  backgroundColor: "transparent",
  transitionProperty: "transform",
  "&:hover": {
    transform: "scale(0.90)",
    opacity: 0.5 + "!important",
  },
  ...(props.right && {
    marginLeft: "auto",
  }),
  ...(props.disabled && {
    opacity: 0.5,
    pointerEvents: "none",
  }),
  ...(props.isStylized &&
    ({
      borderRadius: "50%",
      height: "min-content",
      padding: 5,
      backgroundColor: theme.colors.secondaryAccent,
    } as CSSObject)),
}));
