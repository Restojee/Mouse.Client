import styled from 'styled-components';
import { StyledBox } from "@/ui/Box";
import { Property } from "csstype";

export const StyledMapContentTags = styled(StyledBox)({

})

type StyledTagType = {
    bgColor?: Property.BackgroundColor,
    chips?: boolean,
    isActive?: boolean,
    small?: boolean

}
export const StyledTag = styled(StyledBox)<StyledTagType>(({ theme,...props }) => ({
    justifyContent: 'center',
    textAlign: 'center',
    width: 'min-content',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    backgroundColor: props.bgColor || 'rgba(0, 0, 0, 0.07)',
    padding: '6px 15px',
    fontSize: '0.8rem',
    borderRadius: '20px',
    svg: {
        opacity: 0.8,
    },
    ...props.chips && {
        cursor: 'pointer',
        border: '1px solid transparent',
        '&:hover': {
            transform: 'scale(0.95)',
        },
    },
    ...props.isActive && {
        backgroundColor: theme.colors.brandColor,
        color: theme.colors.brandColorContrastText
    },
    ...props.small && {
        fontSize: '0.7rem',
        padding: '4px 10px',
    },
}))