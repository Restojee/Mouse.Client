import styled from "styled-components";

export const StyledSidebarLogo = styled.div<{ isOpen: boolean }>(({ isOpen, theme }) => ({
  margin: "0 auto",
  color: theme.colors.brandColor,
  fontFamily: theme.font.logoFont,
  fontSize: 30,
  userSelect: "none",
  "-moz-user-select": "none",
  marginTop: "auto",
  visibility: isOpen ? "visible" : "hidden",
  opacity: isOpen ? "1" : "0",
  transition: "0.2s",
}));
