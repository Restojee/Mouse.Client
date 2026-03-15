import styled from "styled-components";

export const StylesUpdateTagModal = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  color: theme.colors.textOnSecondary,
}));

export const StyledTagActions = styled.div({
  display: "flex",
  gap: 10,
  svg: {
    width: 18,
    height: 18,
    opacity: 0.6,
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
});
