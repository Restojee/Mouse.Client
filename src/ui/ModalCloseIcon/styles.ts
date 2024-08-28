import styled from "styled-components";

export const StyledModalCloseIcon = styled.div(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 1,
  color: theme.colors.textOnSecondary,
}));
