import { LayoutProps } from "@/layout/common/withLayout";
import * as React from "react";

type ILayoutContext = {
  setLayout: (payload: () => React.FC<LayoutProps>) => void;
  layout: React.FC<LayoutProps>;
};
export const LayoutContext = React.createContext<ILayoutContext>({
  layout: () => null,
  setLayout: () => {},
});
