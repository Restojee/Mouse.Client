import styled from "styled-components";

export const StyledPagePanelButton = styled.button((props) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 10,
  color: "inherit",
  padding: "5px 8px",
  backgroundColor: props.theme.colors.neutral,
  transition: "0.2s",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  svg: {
    width: 14,
    height: 14,
  },
  ...(props.disabled && {
    pointerEvents: "none",
    opacity: 0.3,
  }),
}));
