import styled from "styled-components";

export const StyledMapsGrid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gridGap: "20px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "8px",
  },
});
