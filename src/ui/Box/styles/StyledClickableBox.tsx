import styled from "styled-components";
import { StyledBox}  from "@/ui/Box";

export const StyledClickableBox = styled(StyledBox)(props => ({
    cursor: "pointer",
    borderRadius: 10,
    transition: "0.2s",
    "&:hover": {
        opacity: 0.7,
        transform: "scale(0.95)",
    },
    ...props.isActive && {
        backgroundColor: props.bgColorByActive || props.theme.colors.primaryLight,
        pointerEvents: "none",
    }
}))