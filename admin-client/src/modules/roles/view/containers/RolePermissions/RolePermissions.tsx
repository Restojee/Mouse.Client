import React from 'react';
import { Paper, Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Checkbox } from '@common/components/Checkbox';
import { TextTags } from '@common/constants/textTags';
import type { PolicyInfo } from '@/modules/roles/model/entities/types';
import type RolePermissionsModel from './RolePermissions.model';
import styles from './RolePermissions.module.scss';

export interface RolePermissionsProps {
  policies: PolicyInfo[];
  onChange?: (policies: PolicyInfo[]) => void;
  disabled?: boolean;
  title?: string;
  viewModel: RolePermissionsModel;
}

const RolePermissionsView: React.FC<RolePermissionsProps> = ({ viewModel }) => {
  return (
    <Column gap="lg">
      <Paper>
        <Column gap="md">
          <Typography tag={TextTags.H3} fontWeight="semiBold">
            {viewModel.props.title || 'Права доступа'}
          </Typography>

          <Column gap="xs">
            <Row gap="md" className={styles.headerRow}>
              <Typography fontWeight="bold" className={styles.moduleCell}>Модуль</Typography>
              {viewModel.actions.map(action => (
                <Typography key={action.key} fontWeight="bold" className={styles.actionCell}>
                  {action.label}
                </Typography>
              ))}
              <Typography fontWeight="bold" className={styles.toggleCell}>Все</Typography>
            </Row>

            {viewModel.crudPolicies.map(policy => (
              <Row key={policy.key} gap="md" className={styles.row} align="center">
                <Typography className={styles.moduleCell}>{policy.name}</Typography>
                {viewModel.actions.map(action => (
                  <div key={action.key} className={styles.actionCell}>
                    <Checkbox
                      checked={policy[action.key]}
                      onChange={(e) => viewModel.handleActionChange(policy.key, action.key, e.target.checked)}
                      disabled={viewModel.disabled}
                    />
                  </div>
                ))}
                <div className={styles.toggleCell}>
                  <Checkbox
                    checked={policy.all}
                    onChange={(e) => viewModel.handleAllToggle(policy.key, e.target.checked)}
                    disabled={viewModel.disabled}
                  />
                </div>
              </Row>
            ))}
          </Column>
        </Column>
      </Paper>

      {viewModel.togglePolicies.length > 0 && (
        <Paper>
          <Column gap="md">
            <Typography tag={TextTags.H3} fontWeight="semiBold">
              Дополнительные права
            </Typography>

            <Column gap="xs">
              {viewModel.togglePolicies.map(policy => (
                <Row key={policy.key} gap="md" className={styles.row} align="center">
                  <Typography className={styles.moduleCell}>{policy.name}</Typography>
                  <div className={styles.toggleCell}>
                    <Checkbox
                      checked={policy.all}
                      onChange={(e) => viewModel.handleTogglePolicy(policy.key, e.target.checked)}
                      disabled={viewModel.disabled}
                    />
                  </div>
                </Row>
              ))}
            </Column>
          </Column>
        </Paper>
      )}
    </Column>
  );
};

export default RolePermissionsView;
