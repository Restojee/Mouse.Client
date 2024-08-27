import styled from "styled-components";

export const StyledSidebarSwitcher = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  height: "min-content",
  padding: "10px",
  marginBottom: -20,
  transition: "0.2s",
  cursor: "pointer",
  svg: {
    transition: "0.2s",
    "&:hover": {
      transform: "translateX(10px)",
    },
  },
  "&:hover": {
    transform: "scale(0.9)",
  },
});
