import { ReactElement } from "react";
import { PagePanel } from "@/layout/page/styles/PagePanel";

type Props = {
  children: ReactElement;
};
export const PageHeader = (props: Partial<Props>) => {
  return <PagePanel bottom>{props.children}</PagePanel>;
};
