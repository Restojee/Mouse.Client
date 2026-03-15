import styled from "styled-components";

export const StyledFieldError = styled.div<{ isError: boolean }>(({ theme, ...props }) => ({
  fontSize: 10,
  position: "absolute",
  textAlign: "center",
  opacity: 0,
  top: "80%",
  overflow: "hidden",
  color: theme.colors.status.error,
  transition: "0.3s",
  ...(props.isError && {
    top: "100%",
    opacity: 1,
  }),
}));
