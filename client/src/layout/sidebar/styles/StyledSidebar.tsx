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
  width: "100%",
  maxHeight: "100%",
  height: "100%",
  rowGap: 10,
  position: "relative",
  transitionProperty: "min-width, max-width, width",
  padding: `10px 5px`,
  minWidth: theme.sizes.sitePanel.width,
  maxWidth: theme.sizes.sitePanel.width,
  zIndex: theme.order.leftSidebar,
  color: theme.colors.textOnPrimary,
  transition: "0.3s",
  ...(isOpen && {
    minWidth: theme.sizes.leftSidebar.width,
    maxWidth: theme.sizes.leftSidebar.width,
    overflow: "hidden",
    rowGap: 5,
  }),
}));
