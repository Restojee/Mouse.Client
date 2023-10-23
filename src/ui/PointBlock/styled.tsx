import styled from 'styled-components';
import { StyledBox } from "@/ui/Box";
import { Property } from "csstype";

type PointBlockContainerPropsType = {
    bottom?: Property.Bottom,
    left?: Property.Left,
    right?: Property.Right,
    isVisible?: boolean
}
export const StyledPointBlockContainer = styled(StyledBox)<PointBlockContainerPropsType>(({ theme, ...props }) => ({
    position: 'absolute',
    bottom: props.bottom,
    left: props.left,
    right: props.right,
    gap: 0,
    flexDirection: 'column',
    backgroundColor: theme.colors.secondary,
    boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 15,
    width: props.width || 250,
    zIndex: theme.order.popup,
    color: theme.colors.textOnSecondary,
    fontSize: theme.font.fontSize,
    transition: '0.2s',
    pointerEvents: "initial",
}))

export const StyledPointBlockFooter = styled(StyledBox)({});
