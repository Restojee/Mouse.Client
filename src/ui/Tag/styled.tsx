import styled from 'styled-components';
import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { Property } from "csstype";

export const StyledMapContentTags = styled(StyledBox)({
    flexWrap: 'wrap',
})

type StyledTagType = {
    bgColor?: Property.BackgroundColor,
    chips?: boolean,
    checked?: boolean,
    small?: boolean

}
export const StyledTag = styled(StyledBox)<StyledTagType>(({ theme,...props }) => ({
    justifyContent: 'center',
    textAlign: 'center',
    width: 'min-content',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    backgroundColor: props.bgColor || 'rgba(0, 0, 0, 0.1)',
    padding: '2px 10px',
    borderRadius: '20px',
    svg: {
        opacity: 0.8,
    },
    ...props.chips && {
        cursor: 'pointer',
        border: '1px solid transparent',
        '&:hover': {
            opacity: 0.7,
        },
    },
    ...props.checked && {
        boxShadow: 'inset 0 0 0 50px rgba(255, 255, 255, 0.3)',
        border: '1px solid rgba(0, 0, 0, 0.3)',
    },
    ...props.small && {
        fontSize: `calc(${ theme.font.fontSize } - 2px)`,
        padding: '3px 10px',
    },
}))