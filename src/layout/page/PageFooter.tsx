import { ReactNode } from "react";
import { PagePanel } from "@/layout/page/styles/PagePanel";

type Props = {
  children: ReactNode;
};
export const PageFooter = (props: Partial<Props>) => {
  return <PagePanel top>{props.children}</PagePanel>;
};
