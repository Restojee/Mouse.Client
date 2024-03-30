import styled from "styled-components";

export const StyledMapsGrid = styled.div(props => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gridGap: "20px",
}))