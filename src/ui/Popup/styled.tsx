import styled from "styled-components";

export const StyledPopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
`;

export const StyledPopupContent = styled.div<{ minWidth?: number; noPadding?: boolean; transformOrigin?: string; borderRadius?: string }>`
  transform-origin: ${({ transformOrigin }) => transformOrigin ?? "center"};

  position: fixed;
  z-index: 1001;
  min-width: ${({ minWidth }) => minWidth ?? 150}px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.input.border};
  border-radius: ${({ borderRadius, theme }) => borderRadius ?? theme.blockSettings.siteBorder ?? "15px"};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: ${({ noPadding }) => (noPadding ? 0 : "8px")};
  transition:
    opacity 0.2s,
    transform 0.2s;
`;
