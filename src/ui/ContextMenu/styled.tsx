import styled, { css } from "styled-components";

export const StyledContextMenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
`;

export const StyledContextMenuPopup = styled.div<{ top: number; left: number; minWidth?: number }>`
  position: fixed;
  z-index: 1001;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  min-width: ${({ minWidth }) => minWidth ?? 180}px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.input.border};
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 0.15s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

export const StyledContextMenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledContextMenuOption = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  font-size: 0.9rem;
  cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  transition: background-color 0.1s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.default.paperAccent};
  }

  &[data-active="true"] {
    background-color: ${({ theme }) => theme.colors.default.paperAccent};
    font-weight: 600;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `}
`;

export const StyledContextMenuDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.input.border};
  margin: 4px 0;
`;

export const StyledSubMenuIcon = styled.span`
  margin-left: auto;
  opacity: 0.5;
  font-size: 0.7rem;
`;

export const StyledContextMenuTitle = styled.div<{ size?: string }>`
  padding: ${({ size }) => (size === "sm" ? "6px 14px" : "8px 14px")};
  font-weight: 600;
  font-size: ${({ size }) => (size === "sm" ? "0.8rem" : "0.9rem")};
  border-bottom: 1px solid ${({ theme }) => theme.colors.input.border};
`;

export const StyledSubMenuPopup = styled.div`
  position: fixed;
  z-index: 1002;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.input.border};
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 0.15s ease forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;
