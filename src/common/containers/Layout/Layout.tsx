import React, { PropsWithChildren } from "react";
import { Paper, Row, Spacer } from "@ui/Layout";
import styles from "./Layout.module.scss";
import SidePanel from "@common/containers/SidePanel/SidePanel";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper className={styles.root} bgColor="primary">
      <Spacer pa="lg">
        <Paper bgColor="secondary" radius="lg">
          <Row>
            <SidePanel />
            { children }
          </Row>
        </Paper>
      </Spacer>
    </Paper>
  );
};

export default Layout;
