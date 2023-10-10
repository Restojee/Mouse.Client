import styled, { keyframes } from "styled-components";
import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { StyledTextarea } from "@/ui/Textarea/styled";

const AnimateMapView = keyframes`
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
`;

export const StyledMapContent = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 100px 1px rgba(0, 0, 0, 1);
    align-self: center;
    justify-self: center;
    width: 100%;
    border-radius: ${ ({ theme }) => theme.blockSettings.siteBorder };
    max-width: 1200px;
    height: 100%;
    max-height: 100%;
    background-color: ${ ({ theme }) => theme.colors.primary };
    border-radius: ${ ({ theme }) => theme.blockSettings.siteBorder };
    z-index: ${ ({ theme }) => theme.order.modal };
    // animation-name: ${ AnimateMapView };
    // animation-duration: 0.2s;
    // animation-timing-function: ease-in;
`;

export const StyledMapContentMain = styled.div(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: 25,
    color: theme.colors.textOnPrimary,
    padding: 30,
    borderRadius: "inherit",
    flexGrow: 1,
    "::placeholder": {
        color: "rgba(255, 255, 255, 0.5)",
    },
}))

export const StyledMapContentNoteForm = styled(StyledTextarea)(({ theme }) => ({
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

export const StyledMapContentSidebar = styled.div(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.secondary,
    boxShadow: "-10px 0 20px 1px rgba(0, 0, 0, 0.4)",
    maxWidth: "370px",
    minWidth: "370px",
    maxHeight: "100%",
    width: "100%",
    borderRadius: "inherit",
    padding: "30px 0 0 0",
    "@media all and (max-width: 1400px)": {
        maxWidth: "300px",
        minWidth: "300px",
    },
}))

export const StyledMapContentSidebarIconsSection = styled(StyledBox)({
    width: "100%",
    padding: "20px 0",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
})

export const StyledMapContentSidebarComments = styled(StyledBox)({
    width: "100%",
    flexDirection: "column",
    overflow: "hidden",
    padding: "20px 0 0",
})

export const StyledMapContentSidebarCommentsHeader = styled(StyledBox)({
    width: "100%",
    padding: "0 20px"
})

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

export const StyledMiniMapImagesContainer = styled(StyledBox)({
    borderRadius: "10px"
})

type StyledMiniMapImageContainerPropsType = {
    isVisible?: boolean,
    username?: string,
    isActive?: boolean
}
export const StyledMiniMapImageContainer = styled.div<StyledMiniMapImageContainerPropsType>(({ theme, ...props }) => ({
    height: '80px',
    maxHeight: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '130px',
    maxWidth: '130px',
    borderRadius: '10px',
    cursor: 'pointer',
    position: 'relative',
    transition: '0.1s',
    transitionProperty: 'background-color, transform, box-shadow',
    backgroundColor: "gray",

    '&:hover': {
        transform: 'scale(0.97)',
    },

    '&:active': {
        transform: 'scale(0.96)',
    }
}))

export const StyledMobileMapViewContainer = styled.div(({ theme }) => ({
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

export const StyledMobileMapViewMainBlock = styled(StyledBox)(({ theme }) => ({
    flexDirection: 'column',
    color: theme.colors.textOnPrimary,
    padding: 20,
    height: 'auto',
    borderRadius: 'inherit',

    '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
    },
}))

export const StyledMobileMapViewSidebarBlock = styled(StyledBox)(({ theme }) => ({
    flexDirection: 'column',
    backgroundColor: theme.colors.secondary,
    boxShadow: '-10px 0 20px 1px rgba(0, 0, 0, 0.4)',
    borderRadius: 'inherit',
    width: '100%',
    padding: 0
}))

export const StyledMapContentSidebarProfile = styled(StyledBox)(({ theme }) => ({
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    margin: "0 30px 20px 30px"
}))