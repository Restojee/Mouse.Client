import { Property } from "csstype";
import styled from "styled-components";

export type Props = {
  transition: Property.Transition;
  gap: Property.Gap;
  justifyContent: Property.JustifyContent;

  isOpen: boolean;
};
export const StyledSidebarSection = styled.div<Partial<Props>>(({ theme, isOpen, justifyContent, gap }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  fontSize: `calc(${theme.font.fontSize} - 2px)`,
  color: isOpen ? `rgba(255, 255, 255, 0.6)` : `rgba(255, 255, 255, 0)`,
  whiteSpace: "nowrap",
  height: isOpen ? `20px` : `0`,
  padding: isOpen ? `0 20px 10px 20px` : `0 20px`,
  position: "relative",
  paddingTop: 5,
  transition: "0.3s",
  justifyContent: justifyContent,
  gap: gap,
}));
