import styled from "styled-components";

export const StyledDrawer = styled.div<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.colors.secondaryDark,
  color: theme.colors.textOnSecondary,
  height: "100%",
  position: "relative",
  padding: 0,
  width: theme.sizes.rightSidebar.width,
  flexShrink: 0,
  overflow: "hidden",
  borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
  zIndex: theme.order.rightSidebar,
  transform: isOpen ? "translateX(0)" : `translateX(${theme.sizes.rightSidebar.width})`,
  marginRight: isOpen ? 0 : `calc(-1 * ${theme.sizes.rightSidebar.width})`,
  transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), margin-right 0.3s cubic-bezier(0.4,0,0.2,1), background-color 0.3s",
  willChange: "transform",

  "@media all and (max-width: 1140px)": {
    backgroundColor: theme.colors.secondary,
  },
  "@media all and (max-width: 768px)": {
    width: "100%",
    transform: "none",
    marginRight: 0,
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
