import { Property } from "csstype";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  transition: Property.Transition;
  sidebarXPadding: Property.Padding;
};
export const StyledSidebar = styled.div<Partial<Props>>(({ theme, isOpen }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxHeight: "100%",
  rowGap: isOpen ? 5 : 10,
  position: "relative",
  padding: "10px 5px",
  minWidth: theme.sizes.sitePanel.width,
  maxWidth: theme.sizes.sitePanel.width,
  overflow: "hidden",
  zIndex: theme.order.leftSidebar,
  color: theme.colors.textOnPrimary,
  transition: "0.3s",
  ...(isOpen && {
    minWidth: theme.sizes.leftSidebar.width,
    maxWidth: theme.sizes.leftSidebar.width,
  }),
}));
