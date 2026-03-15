import React from 'react';
import { Column } from '@ui/Layout';
import { VirtualScroll } from '@common/components/VirtualScroll';
import { SidePanelHeader } from '@common/components/SidePanelHeader';
import { IconButton } from '@ui/Button/ui/IconButton/IconButton';
import styles from './RightSidebar.module.scss';

interface RightSidebarProps {
  title: string;
  component: React.ComponentType<any>;
  props: any;
  onClose?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ component: Component, props, title, onClose }) => {
  return (
    <Column height={1} width={1} className={styles.sidebar}>
      { title && (
        <SidePanelHeader title={title}>
          <IconButton
            icon="IconReject"
            size="xl"
            variant="secondary"
            onClick={onClose}
            noBg
            noBorder
          />
        </SidePanelHeader>
      ) }
      <Column height={1} className={styles.content}>
        <VirtualScroll>
          { Component && <Component {...props} /> }
        </VirtualScroll>
      </Column>
    </Column>
  );
};
