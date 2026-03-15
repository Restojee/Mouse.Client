import styled from "styled-components";
import { MINI_IMAGES_HEIGHT, MINI_IMAGES_WIDTH } from "../constants";

type StyledMiniMapImageContainerPropsType = {
  isVisible?: boolean;
  isActive?: boolean;
  isWithShadows?: boolean;
};
export const StyledMiniMapImageContainer = styled.div<StyledMiniMapImageContainerPropsType>(({ theme, ...props }) => ({
  height: MINI_IMAGES_HEIGHT,
  maxHeight: MINI_IMAGES_HEIGHT,
  minHeight: MINI_IMAGES_HEIGHT,
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  alignItems: "center",
  minWidth: MINI_IMAGES_WIDTH,
  maxWidth: MINI_IMAGES_WIDTH,
  borderRadius: 15,
  backgroundColor: theme.colors.primaryLight,
  cursor: "pointer",
  position: "relative",
  transition: "0.1s",
  transitionProperty: "background-color, transform, box-shadow",
  img: {
    filter: "blur(4px)",
    "-webkit-filter": "blur(4px)",
  },

  "&:hover": {
    transform: "scale(0.97)",
  },

  "&:active": {
    transform: "scale(0.96)",
  },
  ...(props.isVisible && {
    "&::after": {
      content: "' '",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      overflow: "hidden",
      position: "absolute",
      top: -20,
      left: -20,
      bottom: -20,
      right: -20,
      borderRadius: "inherit",
      transition: "0.7s",
      transitionProperty: "opacity",
    },
    "&:hover": {
      "&::after": {
        opacity: 0.3,
      },
    },
  }),
  ...(props.isActive && {
    img: {
      filter: "none",
      "-webkit-filter": "none",
    },
    backgroundColor: theme.colors.mapBackground,
    pointerEvents: "none",
    "&::after": {
      opacity: 0.3,
    },
  }),
}));

export const StyledMiniMapLabel = styled.div<{ isActive?: boolean }>(({ isActive }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  zIndex: 1,
  ...(isActive && {
    opacity: 0,
  }),
}));

export const StyledMiniMapCount = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 5,
  right: 5,
  position: "absolute",
  backgroundColor: theme.colors.brandColor,
  borderRadius: 25,
  width: 16,
  height: 16,
  fontSize: "0.7rem",
  zIndex: 1,
}));
