import { Property } from 'csstype';
import styled from 'styled-components';

type StyledImageFormContainerPropsType = {
    image: string | null,
    isDrag: boolean,
    width?: Property.Width<number>,
    height?: Property.Height<number>,
}
export const StyledImageFormContainer = styled.div<StyledImageFormContainerPropsType>(({ theme, ...props }) => ({
    display: 'flex',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: '15px 15px',
    height: props.height || 100,
    textAlign: 'center',
    border: '2px dashed rgba(0, 0, 0, 0.1)',
    fontSize: `calc(${ theme.font.fontSize } - 2px)`,
    backgroundImage: `url(${props.image})`,
    backgroundPosition: "center",
    cursor: "pointer",
    backgroundSize: "cover",
    width: props.width,
    userSelect: "none",
    WebkitUserSelect: "none",
    transition: '0.2s',
    ...props.isDrag && {
        border: `2px dashed ${theme.colors.brandColor}`,
    },
    "&:hover": {
        border: `2px dashed ${theme.colors.brandColor}`,
    }
}))

export const StyledImageFormLink = styled.span(({ theme }) => ({
    display: 'inline',
    color: theme.colors.brandColor,
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
        opacity: 0.5,
    }
}))
