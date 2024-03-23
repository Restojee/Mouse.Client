import styled from "styled-components";

export const StyledDrawer = styled.div<{ isOpen: boolean }>(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.secondaryDark,
    height: "100%",
    position: 'relative',
    padding: 0,
    width: theme.sizes.rightSidebar.width,
    borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
    zIndex: theme.order.rightSidebar,
    "@media all and (max-width: 1140px)": {
        // position: "fixed",
        // right: `calc(${ theme.sizes.sitePanel.width } + 5px)`,
        // top: 15,
        // height: "initial",
        // bottom: 15,
        backgroundColor: theme.colors.secondary,
        // boxShadow: "0 0 20px 1px rgba(0, 0, 0, 0.3)",
        // borderRadius: theme.blockSettings.siteBorder,
    },
    "@media all and (max-width: 600px)": {
        right: 10,
        top: 10,
        margin: 0,
        left: 10,
        bottom: `calc(${ theme.sizes.sitePanel.width } + 15px)`,
        width: "auto",
    }
}));

export const StyledDrawerContent = styled.div({
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    flexGrow: 1
});

export const StyledDrawerHeader = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    gap: 10,
    margin: '0 auto',
    padding: "20px",
    borderRadius: "inherit",
    zIndex: 1,
    position: "sticky",
    textAlign: "center",
    fontWeight: "bolder",
    fontSize: `calc(${ theme.font.fontSize } + 2px)`,
    top: 0
}))

export const StyledDrawerBlock = styled.div(({ theme }) => ({
    display: "flex",
    flexDirection: 'column',
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.blockSettings.siteBorder,
    gap: 20,
    padding: 15,
    '@media all and (max-width: 1140px)': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }
}))

