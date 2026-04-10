import styled, { CSSObject } from "styled-components";

export const StyledTabsRow = styled.div({
  position: "relative",
  display: "flex",
  gap: "20px",
  margin: "0 0 20px 0",
});

export const StyledTabSlideIndicator = styled.div(({ theme }) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  borderRadius: 15,
  backgroundColor: theme.colors.brandColor,
  pointerEvents: "none",
  transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s",
  zIndex: 0,
}));

export const StyledTab = styled.div<{ isDisabled?: boolean; isActive: boolean }>(({ theme, ...props }) => ({
  flexGrow: 1,
  textAlign: "center",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  padding: "8px 10px",
  borderRadius: 15,
  cursor: "pointer",
  position: "relative",
  zIndex: 1,
  transition: "color 0.2s",
  color: props.isActive ? "#FFFFFF" : "inherit",
  fontWeight: props.isActive ? "bold" : "normal",
  "&:hover": {
    backgroundColor: props.isActive ? "transparent" : "rgba(0, 0, 0, 0.1)",
  },
  ...(props.isDisabled &&
    ({
      pointerEvents: "none",
      color: theme.colors.disabled,
    } as CSSObject)),
}));
