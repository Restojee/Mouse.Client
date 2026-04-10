import styled, { CSSObject } from "styled-components";
import { Property } from "csstype";

type StyledIconButtonPropsType = {
  opacity?: Property.Opacity;
  margin?: Property.Margin;
  padding?: Property.Padding;
  right?: Property.Right;
  isAdmin?: boolean;
  isStylized?: boolean;
  isPanel?: boolean;
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
  borderRadius: "10px",
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
  ...(props.isPanel &&
    ({
      opacity: 1,
      padding: "5px 8px",
      borderRadius: 10,
      backgroundColor: theme.colors.neutral,
      transitionProperty: "background-color",
      transform: "none",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        transform: "none",
        opacity: 1,
      },
      svg: {
        width: 14,
        height: 14,
      },
    } as CSSObject)),
}));
