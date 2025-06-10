import * as React from "react";
import { Center, Column, Paper } from "@ui/Layout";
import NavigationModule from "@/modules/navigation/view";
import TagModule from "@/modules/tags";
import { LanguageSwitcher } from "@common/components/LanguageSwitcher";
import { observer } from "mobx-react-lite";

import "./SidePanel.scss";
import { PopupExample } from "@ui/Popup";

const SidePanel = () => (
  <Column minWidth={300} maxWidth={300} py="sm" px="xs" className="SidePanel">
    <Paper bgColor="paletteBackgroundPrimary">
      <Column width={1}>
        <Column>
          <NavigationModule />
          <TagModule />
        </Column>
        <Center width={1}>
          <Column gap="md">
            <PopupExample />
            <LanguageSwitcher />
          </Column>
        </Center>
      </Column>
    </Paper>
  </Column>
)

export default React.memo(SidePanel);
