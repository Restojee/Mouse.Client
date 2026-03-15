import * as React from "react";
import { Drawer } from "@/layout/drawer/Drawer";
import { Panel, TabsType } from "@/layout/panel/Panel";
import { Sidebar } from "@/layout/sidebar/Sidebar";
import { StyledLayout, StyledWrapper } from "@/layout/StyledLayout";
import { Display } from "@/ui/Display";

type DefaultProps = {
  children: React.ReactElement;
};
export const LayoutDefault: React.FC<DefaultProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<TabsType>("chat");

  return (
    <StyledLayout>
      <Sidebar />
      <StyledWrapper>
        {props.children}
        <Display condition={isOpen}>
          <Drawer
            isOpen={isOpen}
            activeTab={activeTab}
          />
        </Display>
      </StyledWrapper>
      <Panel
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </StyledLayout>
  );
};
