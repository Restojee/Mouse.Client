import { StyledBox } from "@/ui/Box";
import styled from "styled-components";

export const CardSliderWrapper = styled(StyledBox)({
  width: "100%",
  alignItems: "center",
  position: "relative",
  ".swiper": {
    width: "100%",
  },
});

type CardSliderNavArrowType = {
  isPrev?: boolean;
  isNext?: boolean;
};

export const CardSliderNavArrow = styled.div<CardSliderNavArrowType>(({ theme, ...props }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.primaryAccent,
  backdropFilter: "blur(4px)",
  color: theme.colors.textOnPrimary,
  width: 36,
  height: 36,
  padding: 8,
  borderRadius: 50,
  position: "absolute",
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  userSelect: "none",
  msUserSelect: "none",
  webkitUserSelect: "none",
  transition: "0.2s",
  zIndex: 1,
  ...(props.isNext && {
    right: -18,
  }),
  ...(props.isPrev && {
    left: -18,
  }),
  "&.swiper-button-disabled": {
    opacity: 0,
    cursor: "initial",
  },
  "&:hover": {
    transform: "scale(0.92)",
  },
}));
