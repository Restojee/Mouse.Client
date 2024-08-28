import styled, { CSSObject } from "styled-components";

export const StyledTab = styled.div<{ isActive: boolean }>(({ theme, ...props }) => ({
  flexGrow: 1,
  textAlign: "center",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  padding: 5,
  borderRadius: 10,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  ...(props.isActive &&
    ({
      fontWeight: "bold",
      pointerEvents: "none",
      color: "#FFFFFF",
      backgroundColor: theme.colors.status.success,
    } as CSSObject)),
}));
