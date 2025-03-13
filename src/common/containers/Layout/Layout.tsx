import * as React from "react";
import { Column, Paper, Row } from "@ui/Layout";
import SidePanel from "@common/containers/SidePanel/SidePanel";
import ContentPanel from "@common/containers/NavigationPanel/NavigationPanel";
import { layoutClassPrx } from "@common/containers/Layout/constants";

import "./Layout.scss";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Paper className={layoutClassPrx} bgColor="paletteBackgroundPrimary">
      <Row>
        <SidePanel />
        <Column pa="lg" width={1}>
          <Paper bgColor="paletteBackgroundSecondary" radius="lg">
            {children}
          </Paper>
        </Column>
        <ContentPanel />
      </Row>
    </Paper>
  );
};

export default Layout;
