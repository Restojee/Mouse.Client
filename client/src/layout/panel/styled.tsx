import styled from "styled-components";

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
