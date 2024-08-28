import styled from "styled-components";

export const StyledBoxLoader = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.backgroundShadow,
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 3,
  pointerEvents: "none",
}));
