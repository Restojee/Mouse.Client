import styled from "styled-components";

export const StyledDrawer = styled.div<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.colors.secondaryDark,
  height: "100%",
  position: "relative",
  padding: 0,
  minWidth: isOpen ? theme.sizes.rightSidebar.width : 0,
  maxWidth: isOpen ? theme.sizes.rightSidebar.width : 0,
  overflow: "hidden",
  borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
  zIndex: theme.order.rightSidebar,
  transition: "min-width 0.3s, max-width 0.3s, background-color 0.3s",

  "@media all and (max-width: 1140px)": {
    backgroundColor: theme.colors.secondary,
  },
  "@media all and (max-width: 768px)": {
    width: "100%",
    minWidth: "auto",
    maxWidth: "none",
    height: "100%",
    borderLeft: "none",
    backgroundColor: theme.colors.secondary,
    overflow: "auto",
  },
}));

export const StyledDrawerContent = styled.div({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  flexGrow: 1,
});

export const StyledDrawerHeader = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  margin: "0 auto",
  padding: "20px",
  borderRadius: "inherit",
  zIndex: 1,
  position: "sticky",
  fontWeight: "bolder",
  fontSize: `calc(${theme.font.fontSize} + 2px)`,
  top: 0,
}));

export const StyledDrawerBlock = styled.div<{ isMyCard: boolean }>(({ theme, isMyCard }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.colors.secondary,
  borderRadius: theme.blockSettings.siteBorder,
  gap: 20,
  padding: 15,
  "@media all and (max-width: 1140px)": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  ...(isMyCard && {
    boxShadow: ` inset 0 0 3px 0 ${theme.colors.mapBackground}`,
  }),
}));
