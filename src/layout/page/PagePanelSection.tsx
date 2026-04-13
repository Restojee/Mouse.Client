import { FC, ReactElement, useState } from "react";
import { Box } from "@/ui/Box";
import { PagePanelButton } from "@/layout/page/styles/PagePanelButton";

export type Props = {
  isOpen: boolean;
  icon: ReactElement;
  activeIcon: ReactElement;
  content: ReactElement;
};
export const PagePanelSection: FC<Partial<Props>> = (props) => {
  const { content, icon, activeIcon } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box>
      <PagePanelButton onClick={() => setIsOpen(false)}>
        {icon}
        {isOpen ? activeIcon : null}
      </PagePanelButton>
      {isOpen ? content : null}
    </Box>
  );
};
