import { ReactElement } from "react";
import { StyledPagePanel } from "@/layout/page/styles/StyledPagePanel";

type Props = {
  children: ReactElement;
};
export const PageHeader = (props: Partial<Props>) => {
  return <StyledPagePanel bottom>{props.children}</StyledPagePanel>;
};
