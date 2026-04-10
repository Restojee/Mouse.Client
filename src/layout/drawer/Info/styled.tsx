import styled from "styled-components";

export const StyledInfoList = styled.div({
  display: "flex",
  flexDirection: "column",
  maxHeight: "100%",
  overflow: "auto",
  padding: "0 20px 20px 20px",
});
export const StyledInfoBlock = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.colors.default.paper,
  color: "#333333",
  padding: 15,
  wordBreak: "break-word",
  borderRadius: 15,
}));

export const StyledInfoTitle = styled.div(({ theme }) => ({
  wordBreak: "break-word",
  margin: "0 0 0 5px",
  opacity: 0.7,
  cursor: "pointer",
  padding: "2px 10px",
  borderRadius: 10,
  "&:hover": {
    backgroundColor: theme.colors.secondaryDarker,
  },
}));
