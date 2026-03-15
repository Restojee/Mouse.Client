import styled, { CSSObject } from "styled-components";

export const StyledTab = styled.div<{ isDisabled?: boolean; isActive: boolean }>(({ theme, ...props }) => ({
  flexGrow: 1,
  textAlign: "center",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  padding: "8px 10px",
  borderRadius: 15,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  ...(props.isDisabled &&
    ({
      pointerEvents: "none",
      color: theme.colors.disabled,
      backgroundColor: theme.colors.default.paperAccent,
    } as CSSObject)),
  ...(props.isActive &&
    ({
      fontWeight: "bold",
      pointerEvents: "none",
      color: "#FFFFFF",
      backgroundColor: theme.colors.status.success,
    } as CSSObject)),
}));
