import styled from 'styled-components';
import { StyledTextarea } from "@/ui/Textarea/styled";
import { Property } from "csstype";

export const StyledMessageText = styled.div({
    wordBreak: 'break-word',
    maxWidth: '100%',
    textAlign: 'initial',
})

export const StyledMessageSendFormTextarea = styled(StyledTextarea)<{ bgColor?: Property.BackgroundColor }>(
    ({ theme, ...props }) => ({
        flexGrow: 1,
        borderRadius: theme.blockSettings.siteBorder,
        height: 54,
        minHeight: 54,
        overflow: 'hidden',
        transition: '0.2s',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundColor: props.bgColor || '',
        '&:focus': {
            height: 100,
            overflow: 'auto'
        }
    }))

export const StyledMessageSendFormIcon = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    transition: '0.1s',
    transitionProperty: 'transform',
    '&:hover': {
        transform: 'translateX(5px)'
    },
    '&:active': {
        transform: 'translateX(5px) scale(1.1)'
    }
})

type StyledImageContainerPropsType = {
    borderRadius?: Property.BorderRadius,
    margin?: Property.Margin,
    width?: Property.Width,
    height?: Property.Height,
    maxHeight?: Property.MaxHeight,
    bgColor?: Property.BackgroundColor
}
export const StyledMapContentPreview = styled.div<StyledImageContainerPropsType>((props) => ({
    display: 'flex',
    borderRadius: props.borderRadius || 'inherit',
    margin: props.margin,
    width: props.width,
    height: props.height,
    overflow: 'hidden',
    maxHeight: props.maxHeight,
    transition: '0.2s',
    backgroundColor: props.bgColor,
    flexGrow: 1,
}))
