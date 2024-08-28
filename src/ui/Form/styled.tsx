import { Property } from "csstype";
import styled from "styled-components";

export const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 20,
  columnGap: 20,
  rowGap: 20,
});

export const StyledFormColumn = styled.div({
  display: "flex",
  flexGrow: 1,
  width: "100%",
  alignItems: "flex-end",
});

export const StyledFormRow = styled.div<{ justify?: Property.JustifyContent }>((props) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: props.justify,
  gap: "20px",
  columnGap: "20px",
  rowGap: "20px",
  maxWidth: "100%",
  width: "100%",
}));

export const StyledFormElementContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "100%",
});

export const StyledFormElementHeader = styled.div({
  margin: "0 0 10px 10px",
  opacity: 0.6,
  fontSize: 12,
});

type InputWrapperPropsType = {
  width?: Property.Width;
  bgColor?: Property.BackgroundColor;
  isError?: boolean;
  isDisabled?: boolean;
};
export const StyledInputWrapper = styled.div<InputWrapperPropsType>(({ theme, ...props }) => ({
  display: "flex",
  borderRadius: "50px",
  minWidth: props.width,
  maxWidth: "100%",
  zIndex: 1,
  position: "relative",
  boxShadow: `inset 0 0 100px 100px ${props.bgColor || theme.colors.input.default}`,
  border: `1px solid ${theme.colors.input.border}`,
  transition: "0.2s",
  transitionProperty: "opacity, background-color, border, box-shadow, margin",
  "&:hover": {
    boxShadow: `inset 0 0 100px 100px ${props.bgColor ? "" : theme.colors.input.hover}`,
    ...(props.bgColor && {
      opacity: 0.7,
    }),
  },
  "&:focus": {
    boxShadow: `inset 0 0 100px 100px ${theme.colors.input.hover}`,
  },
  ...(props.isError && {
    marginBottom: 5,
    border: `1px solid ${theme.colors.status.error}`,
  }),
  ...(props.isDisabled && {
    pointerEvents: "none",
    opacity: 0.5,
  }),
}));

export const StyledInput = styled.input((props) => ({
  backgroundColor: "transparent",
  background: "none",
  border: "none",
  outline: "none",
  resize: "none",
  flexGrow: 1,
  font: "inherit",
  width: "100%",
  maxWidth: "100%",
  color: "inherit",
  borderRadius: "50px",
  padding: "10px 15px",
  fontSize: "inherit",
  boxShadow: "inherit",
  textOverflow: "ellipsis",
  cursor: props.readOnly ? "pointer" : "auto",
  "&::placeholder": {
    opacity: 0.6,
  },
}));

type StyledInputIconPropsType = {
  left?: boolean;
  right?: boolean;
  isOpen?: boolean;
};
export const StyledInputIcon = styled.div<StyledInputIconPropsType>(({ theme, ...props }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  padding: "7px 0",
  svg: {
    width: "18px",
    height: "18px",
    zIndex: theme.order.other,
  },
  ...(props.left && {
    marginRight: "-10px",
    marginLeft: "10px",
  }),
  ...(props.right && {
    marginRight: "10px",
    marginLeft: "-10px",
    cursor: "pointer",
    svg: {
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
  }),
}));

export const StyledCardActions = styled.div({
  display: "flex",
  gap: "10px",
  flexDirection: "row",
});
