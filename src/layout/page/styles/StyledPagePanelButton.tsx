import styled from "styled-components";

export const StyledPagePanelButton = styled.button((props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    color: "inherit",
    padding: '5px 8px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    'svg': {
        width: 28,
        height: 28,
    },
    ...props.disabled && {
        pointerEvents: 'none',
        opacity: 0.5
    }
}))

