import { ReactElement } from "react";
import { Property } from "csstype";
import { SidebarSection as SidebarSectionWrapper } from "@/layout/sidebar/styles/SidebarSection";
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
    <SidebarSectionWrapper
      justifyContent={justifyContent}
      gap={gap}
      isOpen={isOpen}
    >
      {prepend}
      {isOpen ? <Typography isUpperCase>{label}</Typography> : null}
      {append}
    </SidebarSectionWrapper>
  );
};
