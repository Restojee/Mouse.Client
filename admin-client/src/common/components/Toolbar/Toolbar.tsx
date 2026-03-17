import React from 'react';
import clsx from 'clsx';
import { Row } from '@common/components/Layout';
import { ToolbarProps, ToolbarElement, ToolbarItem } from './types';
import { Icon } from '@common/components/Icon';
import styles from './Toolbar.module.scss';
import { ButtonIcon } from '@ui/ButtonIcon';

const Toolbar: React.FC<ToolbarProps> = ({ items, className }) => {
  const leftItems = items.filter((item) => item.align !== 'right');
  const rightItems = items.filter((item) => item.align === 'right');

  const renderItem = React.useCallback(function renderItem(element: ToolbarElement) {

    if (element && element.type === 'divider') {
      return (
        <div key={element.id} className={styles.divider} />
      );
    }

    return (
      <Row
        key={element.id}
        className={clsx(styles.iconButton, {
          [styles.active]: element.isActive,
        })}
        onClick={element.disabled ? undefined : element.onClick}
        nonIntegration
      >
        {
          element.component ?? (
            <ButtonIcon
              icon={element.icon}
              className={styles.iconButtonContent}
              disabled={element.disabled}
              size="md"
            />
          )
        }
      </Row>
    );
  }, []);

  return (
    <Row className={clsx(styles.toolbar, className)} gap="sm" px="sm" py="xs" align="center">
      <Row gap="xs" align="center" justify="start">
        {leftItems.map(renderItem)}
      </Row>
      {rightItems.length > 0 && (
        <Row gap="xs" align="center" justify="end">
          {rightItems.map(renderItem)}
        </Row>
      )}
    </Row>
  );
};

export default React.memo(Toolbar);
