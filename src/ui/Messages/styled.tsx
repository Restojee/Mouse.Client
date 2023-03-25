import styled from 'styled-components';
import { StyledTextarea } from "@/ui/Textarea/styled";
import { Property } from "csstype";
import { Typography } from "@/ui/Typography/styles/Typography";
import {StyledAvatar} from "@/layout/avatar/styles/StyledAvatar";

export const StyledMessageStyled = styled.div(({ theme }) => ({
    display: 'flex',
    maxWidth: '100%',
    marginBottom: '10px',
    backgroundColor: theme.colors.secondary,
    borderRadius: '10px',
    padding: '10px',
    '&:last-of-type': {
        marginBottom: '0'
    }
}))

export const StyledMessageAvatar = styled(StyledAvatar)({
    minWidth: 50,
    minHeight: 50,
    marginRight: 10,
})

export const StyledMessageBody = styled.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden'
})

export const StyledMessageText = styled.div({
    wordBreak: 'break-word',
    maxWidth: '100%'
})

export const StyledMessageFooter = styled(Typography)(({ theme }) => ({
    display: 'flex',
    opacity: 0.4,
    marginLeft: 'auto',
    fontSize: `calc(${ theme.font.fontSize } - 2px)`,
    cursor: 'pointer',

    '&:hover': {
        textDecoration: 'underline',
    }
}))

export const StyledMessageSendForm = styled.div({
    display: "flex",
    alignItems: "center",
    marginTop: "auto",
    width: "100%",
    padding: "10px 0 10px 10px",
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
    borderRadius: props.borderRadius || 'inherit',
    margin: props.margin,
    width: props.width,
    height: props.height,
    maxHeight: props.maxHeight,
    transition: '0.2s',
    backgroundColor: props.bgColor,
    flexGrow: 1,
    img: {
        width: "100%",
        objectFit: "cover",
        objectPosition: "center",
        borderRadius: "inherit"
    }
}))
