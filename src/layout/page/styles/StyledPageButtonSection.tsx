import styled from "styled-components";

export const StyledPagePaneBlock = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  padding: "5px 8px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  svg: {
    width: "28px",
    height: "28px",
  },
});
