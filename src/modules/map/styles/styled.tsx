import styled from "styled-components";
import { StyledBox } from "@/ui/Box";
import { StyledTextarea } from "@/ui/Textarea/styled";

export const StyledMapContentMain = styled.div(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    gap: 25,
    minHeight: "100%",
    overflow: "auto",
    color: theme.colors.textOnPrimary,
    padding: 20,
    borderRadius: "inherit",
    flexGrow: 1,
    "::placeholder": {
        color: "rgba(255, 255, 255, 0.5)",
    },
}))

export const StyledMapContentNoteForm = styled(StyledTextarea)(({theme}) => ({
    marginTop: 'auto',
    backgroundColor: theme.colors.primaryLighter,
    "&:hover": {
        opacity: 0.8,
        backgroundColor: theme.colors.primaryLighter,
    },
    "&:focus": {
        opacity: 0.8,
        backgroundColor: theme.colors.primaryLighter,
    },
}))

export const StyledMapContentSidebar = styled.div(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.secondary,
    boxShadow: "-10px 0 20px 1px rgba(0, 0, 0, 0.4)",
    maxWidth: "370px",
    minWidth: "370px",
    maxHeight: "100%",
    height: "100%",
    position: 'sticky',
    top: 0,
    width: "100%",
    borderRadius: "inherit",
    padding: "30px 0 0 0",
    "@media all and (max-width: 1400px)": {
        maxWidth: "300px",
        minWidth: "300px",
    },
}))

export const StyledContentSidebarBodyIcon = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "10px 0",
    margin: "0 15px",
    alignItems: "center",
    width: "100%",
    position: "relative",
    cursor: "pointer",
    transition: "0.2s",
    transitionProperty: "opacity, transform",
    "&:before": {
        content: '""',
        borderRadius: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        height: "50px",
        width: "50px",
        position: "absolute",
        opacity: 0,
        transition: "0.1s",
        transitionProperty: "opacity, transform"
    },
    "&:after": {
        content: "' '",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        height: "50%",
        position: "absolute",
        right: "-15px",
        width: "1px",
        pointerEvents: "none"
    },
    "&:last-of-type": {
        "&:after": {
            display: "none"
        }
    },
    "&:hover": {
        "&::before": {
            opacity: 1
        }
    },
    "&:active": {
        "&::before": {
            transform: "scale(1.3)"
        }
    }
})

export const StyledMobileMapViewContainer = styled.div(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.order.modal,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.blockSettings.siteBorder,
    top: '10px',
    right: '10px',
    left: '10px',
    width: '100%',
    overflow: 'auto',
}))

export const StyledMobileMapViewMainBlock = styled(StyledBox)(({theme}) => ({
    flexDirection: 'column',
    color: theme.colors.textOnPrimary,
    padding: 20,
    height: 'auto',
    borderRadius: 'inherit',
    
    '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
    },
}))

export const StyledMobileMapViewSidebarBlock = styled(StyledBox)(({theme}) => ({
    flexDirection: 'column',
    backgroundColor: theme.colors.secondary,
    boxShadow: '-10px 0 20px 1px rgba(0, 0, 0, 0.4)',
    borderRadius: 'inherit',
    width: '100%',
    padding: 0
}))
