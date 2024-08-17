import styled from 'styled-components';
import { Property } from "csstype";

export const StyledText = styled.form<{size: "md" | "sm"}>(({size}) => ({
    opacity: 0.6,
    fontSize: "0.7rem",
    paddingTop: 10,
}));
