import styled, { css } from "styled-components";

export const StyledContextMenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
`;

export const StyledContextMenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledContextMenuOption = styled.div<{ isDisabled?: boolean; isDanger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  font-size: 0.9rem;
  cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  color: ${({ theme, isDanger }) => (isDanger ? theme.colors.status.error : theme.colors.textOnSecondary)};
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

export const StyledContextMenuUserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textOnSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.input.border};
  margin-bottom: 4px;
`;

export const StyledSubMenuPopup = styled.div`
  position: fixed;
  z-index: 1002;
  min-width: 180px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.input.border};
  border-radius: ${({ theme }) => theme.blockSettings.siteBorder ?? "15px"};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.9);
  animation: scaleIn 0.2s ease forwards;

  @keyframes scaleIn {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
