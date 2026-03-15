import { ReactNode } from "react";
import { StyledPagePanel } from "@/layout/page/styles/StyledPagePanel";

type Props = {
  children: ReactNode;
};
export const PageFooter = (props: Partial<Props>) => {
  return <StyledPagePanel top>{props.children}</StyledPagePanel>;
};
