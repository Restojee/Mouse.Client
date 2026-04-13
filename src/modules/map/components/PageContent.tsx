import { PageContent as PageContentLayout } from "@/layout/page/styles/PageContent";
import { Box } from "@/ui/Box";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
};
export const PageContent = React.forwardRef((props: Partial<Props>) => {
  return (
    <Box
      overflow={"hidden"}
      position={"relative"}
      grow={1}
      style={{ minHeight: 0 }}
    >
      <PageContentLayout id={"maps-page-container"}>{props.children}</PageContentLayout>
    </Box>
  );
});
