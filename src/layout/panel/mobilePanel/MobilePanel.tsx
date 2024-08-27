import { PanelProps } from "@/layout/panel/Panel";
import { StyledMobilePanel } from "@/layout/panel/styled";
import React from "react";

export const MobilePanel = (props: PanelProps) => {
  // const onClickBarLink = (tab: TabsType) => {
  //   props.setActiveTab && props.setActiveTab(tab);
  //   props.setIsOpen && props.setIsOpen(true);
  // };

  console.log(props);

  return (
    <StyledMobilePanel>
      {/*<StyledBox width="100%" justify="space-around">*/}
      {/*    {tabsData.map(({ icon, margin, tab, title, border }, index) => (*/}
      {/*        <MobileBarLink key={index} title={title} onClick={() => onClickBarLink(tab)} checked={tab === activeTab}>*/}
      {/*            <BarLinkIcon>{icon}</BarLinkIcon>*/}
      {/*        </MobileBarLink>*/}
      {/*    ))}*/}
      {/*    <Avatar size="45px" image="https://i.imgur.com/P11sXfz.png" />*/}
      {/*</StyledBox>*/}
    </StyledMobilePanel>
  );
};
