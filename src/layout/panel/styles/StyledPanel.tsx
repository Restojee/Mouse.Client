import styled from "styled-components";

export const StyledPanel = styled.div(props => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: props.theme.sizes.sitePanel.width,
    minWidth: props.theme.sizes.sitePanel.width,
    maxWidth: props.theme.sizes.sitePanel.width,
    minHeight: "100%",
    height: "100%",
    padding: "10px 0"
}))