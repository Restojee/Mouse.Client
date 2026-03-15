import { StyledPageContent } from "@/layout/page/styles/StyledPageContent";
import { StyledBox } from "@/ui/Box";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
};
export const PageContent = React.forwardRef((props: Partial<Props>) => {
  return (
    <StyledBox
      overflow={"hidden"}
      position={"relative"}
      grow={1}
    >
      <StyledPageContent id={"maps-page-container"}>{props.children}</StyledPageContent>
    </StyledBox>
  );
});
