import styled from 'styled-components';
import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { Property } from "csstype";

type PointBlockContainerPropsType = {
    bottom?: Property.Bottom,
    left?: Property.Left,
    isVisible?: boolean
}
export const StyledPointBlockContainer = styled(StyledBox)<PointBlockContainerPropsType>(({ theme, ...props }) => ({
    position: 'absolute',
    bottom: props.bottom,
    left: props.left,
    gap: 0,
    flexDirection: 'column',
    backgroundColor: theme.colors.secondary,
    boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 15,
    visibility: "hidden",
    opacity: 0,
    pointerEvents: "none",
    width: props.width || 250,
    zIndex: theme.order.other,
    color: theme.colors.textOnSecondary,
    fontSize: theme.font.fontSize,
    transition: '0.2s',
    ...props.isVisible && {
        visibility: "visible",
        opacity: 1,
        pointerEvents: "initial"
    }
}))
export const StyledPointBlockHeader = styled(StyledBox)({
    marginBottom: 15
})

export const StyledPointBlockBody = styled(StyledBox)({
    gap: 20
})

export const StyledPointBlockFooter = styled(StyledBox)({});
