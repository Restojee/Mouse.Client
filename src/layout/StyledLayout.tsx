import styled from "styled-components";

export const StyledLayout = styled.div(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: "100vh",
    height: "100vh",
    overflow: "auto",
    width: "100%",
    padding: "10px 0",
    fontSize: theme.font.fontSize,
    backgroundColor: theme.colors.primary,
    "@media all and (max-width: ${ baseTheme.sizes.media.medium }px)": {
        flexDirection: "column",
        padding: "0 10px"
    },
}))

export const StyledWrapper = styled.div(({theme}) => ({
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.colors.secondary,
    borderRadius: 20,
    minWidth: 768,
    overflow: "hidden"
}))