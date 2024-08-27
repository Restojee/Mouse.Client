import styled from "styled-components";
import { Property } from "csstype";

type StyledTextareaType = {
  bgColor?: Property.BackgroundColor;
  height?: Property.Height;
};
export const StyledTextarea = styled.textarea<StyledTextareaType>(({ theme, ...props }) => ({
  borderRadius: "10px",
  backgroundColor: props.bgColor || `${theme.colors.input.default}`,
  border: `1px solid ${theme.colors.input.border}`,
  height: props.height || "100px",
  minHeight: props.height || "100px",
  resize: "none",
  font: "inherit",
  fontSize: theme.font.fontSize,
  color: "inherit",
  outline: "none",
  padding: "10px 15px",
  transition: "0.2s",
  transitionProperty: "opacity, background-color, border, box-shadow",
  "&::placeholder": {
    opacity: 0.6,
  },
  "&:hover": {
    backgroundColor: theme.colors.input.hover,
  },
  "&:focus": {
    backgroundColor: theme.colors.input.hover,
  },
}));
