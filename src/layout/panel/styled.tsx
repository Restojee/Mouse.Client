import styled from "styled-components";

export const StyledTabsGroup = styled.div({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: "100%",
});

export const StyledTabSlideIndicator = styled.div(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  borderRadius: 10,
  border: `1px solid ${theme.colors.brandColor}`,
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  pointerEvents: "none",
  transition: "top 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s",
  zIndex: 0,
}));

export const StyledPanel = styled.div((props) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  rowGap: 10,
  width: props.theme.sizes.sitePanel.width,
  minWidth: props.theme.sizes.sitePanel.width,
  maxWidth: props.theme.sizes.sitePanel.width,
  minHeight: "100%",
  height: "100%",
  padding: "10px 0",
}));

export const StyledMobilePanel = styled.div({
  display: "flex",
  padding: 10,
});
