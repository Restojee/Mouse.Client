import React from 'react';
import { Paper, Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { Checkbox } from '@common/components/Checkbox';
import { TextTags } from '@common/constants/textTags';
import type { PolicyInfo, PolicyPermission } from '@/modules/roles/model/entities/types';
import type RolePermissionsModel from './RolePermissions.model';
import type { PolicyGroup } from './RolePermissions.model';
import styles from './RolePermissions.module.scss';

export interface RolePermissionsProps {
  policies: PolicyInfo[];
  onChange?: (policies: PolicyInfo[]) => void;
  disabled?: boolean;
  title?: string;
  viewModel: RolePermissionsModel;
}

interface PermissionCheckboxProps {
  permission?: PolicyPermission;
  policyKey: string;
  disabled: boolean;
  onChange: (policyKey: string, permKey: string, checked: boolean) => void;
}

const PermissionCheckbox: React.FC<PermissionCheckboxProps> = React.memo(({
  permission,
  policyKey,
  disabled,
  onChange,
}) => {
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (permission) {
      onChange(policyKey, permission.key, e.target.checked);
    }
  }, [onChange, policyKey, permission]);

  return (
    <Row className={styles.actionCell}>
      {permission && (
        <Checkbox
          checked={permission.granted}
          onChange={handleChange}
          disabled={disabled}
        />
      )}
    </Row>
  );
});

PermissionCheckbox.displayName = 'PermissionCheckbox';

interface PolicyRowProps {
  policy: PolicyInfo;
  permissionLabels: string[];
  disabled: boolean;
  onPermissionChange: (policyKey: string, permKey: string, checked: boolean) => void;
  onAllToggle: (policyKey: string, checked: boolean) => void;
  getPermissionByLabel: (policy: PolicyInfo, label: string) => PolicyPermission | undefined;
  areAllGranted: (policy: PolicyInfo) => boolean;
}

const PolicyRow: React.FC<PolicyRowProps> = React.memo(({
  policy,
  permissionLabels,
  disabled,
  onPermissionChange,
  onAllToggle,
  getPermissionByLabel,
  areAllGranted,
}) => {
  const handleAllToggle = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onAllToggle(policy.key, e.target.checked);
  }, [onAllToggle, policy.key]);

  return (
    <Row key={policy.key} gap="md" className={styles.row} align="center">
      
      <Typography className={styles.moduleCell}>{policy.name}</Typography>
      
      {permissionLabels.map(label => (
        <PermissionCheckbox
          key={label}
          permission={getPermissionByLabel(policy, label)}
          policyKey={policy.key}
          disabled={disabled}
          onChange={onPermissionChange}
        />
      ))}
      
      <Row className={styles.toggleCell}>
        <Checkbox
          checked={areAllGranted(policy)}
          onChange={handleAllToggle}
          disabled={disabled}
        />
      </Row>
    </Row>
  );
});

PolicyRow.displayName = 'PolicyRow';

interface MatrixGroupProps {
  group: PolicyGroup;
  viewModel: RolePermissionsModel;
}

const MatrixGroup: React.FC<MatrixGroupProps> = ({ group, viewModel }) => {
  const handlePermissionChange = React.useCallback((policyKey: string, permKey: string, checked: boolean) => {
    viewModel.handlePermissionChange(policyKey, permKey, checked);
  }, [viewModel]);

  const handleAllToggle = React.useCallback((policyKey: string, checked: boolean) => {
    viewModel.handleAllToggle(policyKey, checked);
  }, [viewModel]);

  const renderPermissionLabel = React.useCallback((label: string) => (
    <Typography key={label} fontWeight="bold" className={styles.actionCell}>
      {viewModel.getLabelDisplay(label)}
    </Typography>
  ), [viewModel]);

  return (
    <Paper>
      <Column gap="md">
        <Typography tag={TextTags.H3} fontWeight="semiBold">
          {group.title}
        </Typography>

        <Column gap="xs">
          <Row gap="md" className={styles.headerRow}>
            <Typography fontWeight="bold" className={styles.moduleCell}>Название</Typography>
            {group.permissionLabels.map(renderPermissionLabel)}
            <Typography fontWeight="bold" className={styles.toggleCell}>Все</Typography>
          </Row>

          {group.policies.map(policy => (
            <PolicyRow
              key={policy.key}
              policy={policy}
              permissionLabels={group.permissionLabels}
              disabled={viewModel.disabled}
              onPermissionChange={handlePermissionChange}
              onAllToggle={handleAllToggle}
              getPermissionByLabel={viewModel.getPermissionByLabel}
              areAllGranted={viewModel.areAllGranted}
            />
          ))}
        </Column>
      </Column>
    </Paper>
  );
};

interface TogglePolicyRowProps {
  policy: PolicyInfo;
  disabled: boolean;
  onAllToggle: (policyKey: string, checked: boolean) => void;
  areAllGranted: (policy: PolicyInfo) => boolean;
}

const TogglePolicyRow: React.FC<TogglePolicyRowProps> = React.memo(({
  policy,
  disabled,
  onAllToggle,
  areAllGranted,
}) => {
  const handleToggle = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onAllToggle(policy.key, e.target.checked);
  }, [onAllToggle, policy.key]);

  return (
    <Row key={policy.key} gap="md" className={styles.row} align="center">
      <Typography className={styles.moduleCell}>{policy.name}</Typography>
      <Row className={styles.toggleCell}>
        <Checkbox
          checked={areAllGranted(policy)}
          onChange={handleToggle}
          disabled={disabled}
        />
      </Row>
    </Row>
  );
});

TogglePolicyRow.displayName = 'TogglePolicyRow';

interface ToggleGroupProps {
  group: PolicyGroup;
  viewModel: RolePermissionsModel;
}

const ToggleGroup: React.FC<ToggleGroupProps> = ({ group, viewModel }) => {
  const handleAllToggle = React.useCallback((policyKey: string, checked: boolean) => {
    viewModel.handleAllToggle(policyKey, checked);
  }, [viewModel]);

  return (
    <Paper>
      <Column gap="md">
        <Typography tag={TextTags.H3} fontWeight="semiBold">
          {group.title}
        </Typography>

        <Column gap="xs">
          <Row gap="md" className={styles.headerRow}>
            <Typography fontWeight="bold" className={styles.moduleCell}>Название</Typography>
            {group.permissionLabels.map(label => (
              <Typography key={label} fontWeight="bold" className={styles.toggleCell}>
                {viewModel.getLabelDisplay(label)}
              </Typography>
            ))}
          </Row>

          {group.policies.map(policy => (
            <TogglePolicyRow
              key={policy.key}
              policy={policy}
              disabled={viewModel.disabled}
              onAllToggle={handleAllToggle}
              areAllGranted={viewModel.areAllGranted}
            />
          ))}
        </Column>
      </Column>
    </Paper>
  );
};

const RolePermissionsView: React.FC<RolePermissionsProps> = ({ viewModel }) => {
  const renderGroup = React.useCallback((group: PolicyGroup) => (
    group.isMatrix ? (
      <MatrixGroup key={group.label} group={group} viewModel={viewModel} />
    ) : (
      <ToggleGroup key={group.label} group={group} viewModel={viewModel} />
    )
  ), [viewModel]);

  return (
    <Column gap="lg">
      {viewModel.policyGroups.map(renderGroup)}
    </Column>
  );
}

export default RolePermissionsView;
