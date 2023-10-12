import styled from 'styled-components';

type StyledImageFormContainerPropsType = {
    image: string,
    isDrag: boolean
}
export const StyledImageFormContainer = styled.div<StyledImageFormContainerPropsType>(({ theme, ...props }) => ({
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: '15px 10px',
    height: 100,
    textAlign: 'center',
    border: '2px dashed rgba(0, 0, 0, 0.1)',
    fontSize: `calc(${ theme.font.fontSize } - 2px)`,
    backgroundImage: `url(${props.image})`,
    backgroundPosition: "center",
    cursor: "pointer",
    backgroundSize: "cover",
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
    color: theme.colors.brandColor,
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
        opacity: 0.5,
    }
}))
