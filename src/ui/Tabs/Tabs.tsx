import { Box } from "@/ui/Box";

type TabsPropsType = {
  children: JSX.Element[];
};
export const Tabs = ({ children }: TabsPropsType) => {
  return <Box gap={10}>{children}</Box>;
};
