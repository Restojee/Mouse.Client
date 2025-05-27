import * as React from "react";
import { Column, Paper, Row } from "@ui/Layout";
import SidePanel from "@common/containers/SidePanel/SidePanel";
import { Scroll } from "@common/components/Scroll";
import { layoutClassPrx } from "@common/containers/Layout/constants";
import cn from "clsx";

import "./Layout.scss";
import { observer } from "mobx-react-lite";


const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Paper className={layoutClassPrx} bgColor="paletteBackgroundPrimary">
    <Row height={1} pa="lg">
      <SidePanel />
      <Column width={1} height={1}>
        <Paper
          bgColor="paletteBackgroundSecondary"
          radius="lg"
        >
          <Scroll>
            {children}
          </Scroll>
        </Paper>
      </Column>
    </Row>
  </Paper>
);

export default Layout;
