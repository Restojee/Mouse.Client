import { ReactElement } from "react";
import { Property } from "csstype";
import { StyledSidebarSection } from "@/layout/sidebar/styles/StyledSidebarSection";
import { Typography } from "@/ui/Typography/styles/Typography";

type Props = {
  label: string;
  isOpen: boolean;
  gap: Property.Gap;
  justifyContent: Property.JustifyContent;
  append: ReactElement;
  prepend: ReactElement;
};
export const SidebarSection = (props: Partial<Props>) => {
  const { label, isOpen, gap = "15px", prepend, append, justifyContent } = props;

  return (
    <StyledSidebarSection
      justifyContent={justifyContent}
      gap={gap}
      isOpen={isOpen}
    >
      {prepend}
      {isOpen && <Typography isUpperCase>{label}</Typography>}
      {append}
    </StyledSidebarSection>
  );
};
