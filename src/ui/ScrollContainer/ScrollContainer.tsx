import styled, { css } from 'styled-components';
import { Property } from "csstype";

type StyledScrollWrapperPropsType = {
    isSlider?: boolean,
    grow?: Property.FlexGrow,
    maxHeight?: Property.MaxHeight
}
export const StyledScrollWrapper = styled.div<StyledScrollWrapperPropsType>((props) => ({
    display: 'flex',
    position: 'relative',
    overflowX: 'auto',
    minHeight: 'max-content',
    maxHeight: props.maxHeight,
    flexGrow: props.grow || '1',
    ...props.isSlider && {
        flexGrow: 'initial',
        alignItems: 'center',
    },
}))

type StyledScrollContainerPropsType = {
    padding?: Property.Padding,
    bgColor?: Property.BackgroundColor,
    borderRadius?: Property.BorderRadius
}
export const StyledScrollContainer = styled.div<StyledScrollContainerPropsType>((props) => ({
    padding: props.padding,
    backgroundColor: props.bgColor,
    borderRadius: props.borderRadius,
    minWidth: '100%',
    display: 'inline-table',
    height: 100
}))
