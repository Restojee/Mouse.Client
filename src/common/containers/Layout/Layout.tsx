import React, { PropsWithChildren } from "react";
import { Column, Paper, Row, Spacer } from "@ui/Layout";
import styles from "./Layout.module.scss";
import SidePanel from "@common/containers/SidePanel/SidePanel";
import ContentPanel from "@common/containers/NavigationPanel/NavigationPanel";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper className={styles.root} bgColor="primary">
      <Row>
        <SidePanel />
        <Column pa="lg" width={1}>
          <Paper bgColor="secondary" radius="lg">
              {children}
          </Paper>
        </Column>
        <ContentPanel />
      </Row>
    </Paper>
  );
};

export default Layout;
