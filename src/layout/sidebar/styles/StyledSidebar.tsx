import styled from "styled-components";
import {Property} from "csstype";

type Props = {
    isOpen: boolean;
    transition: Property.Transition;
    sidebarXPadding: Property.Padding;
}
export const StyledSidebar = styled.div<Partial<Props>>(({
    theme,
    transition,
    sidebarXPadding,
    isOpen
}) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxHeight: "100%",
    height: "100%",
    position: "relative",
    transitionProperty: "min-width, max-width, width",
    padding: `10px 5px`,
    maxWidth: theme.sizes.sitePanel.width,
    zIndex: theme.order.leftSidebar,
    color: theme.colors.textOnPrimary,
    transition: '0.3s',
    ...isOpen && {
        maxWidth: theme.sizes.leftSidebar.width,
        overflow: "hidden"
    }
}))