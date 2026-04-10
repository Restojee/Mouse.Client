import styled from "styled-components";

export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledListSearch = styled.div`
  padding: 4px 8px;
`;

export const StyledListEmpty = styled.div<{ size?: string }>`
  padding: ${({ size }) => (size === "sm" ? "12px 14px" : "16px 14px")};
  font-size: ${({ size }) => (size === "sm" ? "0.8rem" : "0.9rem")};
  opacity: 0.5;
  text-align: center;
`;

export const StyledListLoader = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
`;
