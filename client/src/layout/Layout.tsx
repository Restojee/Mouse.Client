import { LayoutContext } from "@/layout/common/LayoutContext";
import * as React from "react";

type Props = {
  children: React.ReactElement;
};
export const Layout: React.FC<Props> = (props) => {
  const layoutContext = React.useContext(LayoutContext);
  const LayoutContainer = layoutContext.layout;

  return <LayoutContainer>{props.children}</LayoutContainer>;
};
