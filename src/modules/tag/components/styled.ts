import styled from "styled-components";

export const StylesUpdateTagModal = styled.div(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  color: theme.colors.textOnSecondary,
}));


export const StyledTagActions = styled.div({
  display: "flex",
  svg: {
    padding: 4,
    width: 30,
    height: 30,
    opacity: 0.6,
    "&:hover": {
      transform: "scale(1.1)"
    }
  }
});
