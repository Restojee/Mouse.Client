import styled from 'styled-components';

export const StyledInfoList = styled.div({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
});
export const StyledInfoBlock = styled.div(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.secondary,
    padding: 15,
    wordBreak: 'break-word',
    borderRadius: 15,
    '@media all and (max-width: 1140px)': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
}));

export const StyledInfoTitle = styled.div(({ theme }) => ({
    wordBreak: 'break-word',
    margin: '0 0 0 5px',
    opacity: 0.7,
    cursor: 'pointer',
    padding: '2px 10px',
    borderRadius: 10,
    '&:hover': {
        backgroundColor: theme.colors.secondaryDarker,
    },
}));