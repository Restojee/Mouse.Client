import React, { PropsWithChildren } from "react";
import { Paper, Spacer } from '@ui/Layout';
import styles from './Layout.module.scss';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper className={styles.root} bgColor="primary">
      <Spacer pa={15}>
        <Paper bgColor="secondary" radius={15}>
          { children }
        </Paper>
      </Spacer>
    </Paper>
  );
};

export default Layout;
