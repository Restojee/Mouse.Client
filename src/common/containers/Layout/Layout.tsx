import * as React from "react";
import { Column, Paper, Row } from "@ui/Layout";
import SidePanel from "@common/containers/SidePanel/SidePanel";
import { layoutClassPrx } from "@common/containers/Layout/constants";

import "./Layout.scss";

const Layout = React.memo<React.PropsWithChildren>(
  ({ children }) => (
    <Paper className={layoutClassPrx} bgColor="paletteBackgroundPrimary">
      <Row py="sm">
        <SidePanel />
        <Column width={1}>
          <Paper bgColor="paletteBackgroundSecondary" radius="lg">
            {children}
          </Paper>
        </Column>
        123
      </Row>
    </Paper>
  )
);

export default Layout;
