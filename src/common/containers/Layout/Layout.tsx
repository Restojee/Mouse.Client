import React from 'react';
import { Paper, Spacer } from '@ui/Layout';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <Paper className={styles.Layout} bgColor="primary">
      <Spacer pa={2}>
        <Paper bgColor="secondary">
          12
        </Paper>
      </Spacer>
    </Paper>
  );
};

export default Layout;
