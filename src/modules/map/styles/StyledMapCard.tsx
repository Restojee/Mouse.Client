import styled from "styled-components";

export const StyledMapCard = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: "10px",
  position: "relative",
  backgroundColor: theme.colors.mapBackground,
  boxShadow: "2px 2px 3px 1px rgba(0, 0, 0, 0.2)",
  "@media (max-width: 768px)": {
    boxShadow: "none",
    borderRadius: 0,
  },
  transition: "0.2s",
  cursor: "pointer",
  aspectRatio: "19/9",
  img: {
    transition: "0.5s",
  },
  "&:hover": {
    img: {
      transform: "scale(1.1)",
    },
  },
}));
