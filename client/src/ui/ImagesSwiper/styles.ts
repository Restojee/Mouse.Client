import { StyledBox } from "@/ui/Box";
import styled from "styled-components";

export const CardSliderWrapper = styled(StyledBox)({
  width: "100%",
  alignItems: "center",
  maxHeight: 400,
  height: "100%",
  position: "relative",

  ".swiper-pagination-bullet": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    opacity: 0.6,
    width: 12,
    height: 12,
  },
  ".swiper-pagination-bullet-active-main": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    opacity: 1,
  },
  ".swiper-button-disabled": {
    transition: "none",
    opacity: 0,
  },
});

type CardSliderNavArrowType = {
  isPrev?: boolean;
  isNext?: boolean;
};

export const CardSliderNavArrow = styled.div<CardSliderNavArrowType>(({ ...props }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  backdropFilter: "blur(4px)",
  color: "rgba(0, 0, 0, 0.8)",
  width: 36,
  height: 36,
  padding: 8,
  borderRadius: 50,
  position: "absolute",
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  userSelect: "none",
  msUserSelect: "none",
  webkitUserSelect: "none",
  transitionProperty: "transform",
  transition: "0.2s",
  zIndex: 1,
  ...(props.isNext && {
    right: -18,
  }),
  ...(props.isPrev && {
    left: -18,
  }),
  "&:hover": {
    transform: "scale(0.92)",
  },
}));
