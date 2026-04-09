import styled from "styled-components";

export const StyledAutocompletePopup = styled.div<{ top: number; left: number; minWidth: number }>(
  ({ top, left, minWidth }) => ({
    position: "fixed",
    top,
    left,
    minWidth,
    zIndex: 1100,
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)",
  }),
);

export const StyledAutocompleteList = styled.ul(({ theme }) => ({
  listStyle: "none",
  margin: 0,
  padding: "4px",
  backgroundColor: theme.colors.secondary,
}));

export const StyledAutocompleteItem = styled.li<{ isActive: boolean }>(({ theme, isActive }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 8px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: "0.875rem",
  transition: "background-color 0.1s ease",
  backgroundColor: isActive ? theme.colors.default?.paperAccent ?? "rgba(0,0,0,0.06)" : "transparent",
  "&:hover": {
    backgroundColor: theme.colors.default?.paperAccent ?? "rgba(0,0,0,0.06)",
  },
}));

export const StyledAutocompleteOverlay = styled.div({
  position: "fixed",
  inset: 0,
  zIndex: 1099,
});

export const StyledAutocompleteEmpty = styled.li(({ theme }) => ({
  padding: "6px 8px",
  fontSize: "0.8rem",
  opacity: 0.5,
  color: theme.colors.textOnSecondary ?? "#999",
}));

export const StyledAutocompleteLoader = styled.li({
  padding: "6px 8px",
  display: "flex",
  justifyContent: "center",
});
