import { Property } from "csstype";
import styled from "styled-components";

type Props = {
    transition?: Property.Transition;
    isOpen?: boolean;
}
export const StyledNavLinkSection = styled.div<Props>(props => ({
    display: "flex",
    alignItems: "center",
    opacity: props.isOpen ? `0.7` : `1`,
    transform: props.isOpen ? `scale(0.8)` : `scale(1)`,
    transition: "0.5s",
    cursor: "pointer"
}))