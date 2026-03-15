import styled from "styled-components";

export const StyledWelcomeButton = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: theme.font.logoFont,
  cursor: "pointer",
  color: "#fff",
  position: "relative",
  animationDuration: "1s",
  animationTimingFunction: "linear",
  animationDirection: "alternate",
  animationIterationCount: "infinite",
  transition: "0.2s",
  transitionProperty: "color",
  "&:hover": {
    animationPlayState: "paused",
    color: theme.colors.brandColor,
    textShadow: `0 0 30px ${theme.colors.brandColor}`,
  },
}));
