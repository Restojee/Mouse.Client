import { inject } from 'inversify';
import { Action, Computed } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { RoleDataAccess } from '@/modules/roles/model/services/RoleDataAccess';
import { RoleDataAccessInjectKey } from '@/modules/roles/model/common/constants';
import type { PolicyInfo } from '@/modules/roles/model/entities/types';
import type { RolePermissionsProps } from './RolePermissions';

const PERMISSION_LABELS: Record<string, string> = {
  create: 'Создание',
  read: 'Чтение',
  update: 'Ред.',
  delete: 'Удаление',
  access: 'Доступ',
};

const GROUP_TITLES: Record<string, string> = {
  crud: 'Права доступа',
  other: 'Прочее',
};

const CRUD_ORDER = ['create', 'read', 'update', 'delete'] as const;
const OTHER_ORDER = ['access'] as const;

export interface PolicyGroup {
  label: string;
  title: string;
  policies: PolicyInfo[];
  permissionLabels: string[];
  isMatrix: boolean;
}

class RolePermissionsModel extends ViewModel<RolePermissionsProps> {
  constructor(
    @inject(RoleDataAccessInjectKey) private dataAccess: RoleDataAccess
  ) {
    super();
  }

  @Computed()
  public get policies(): PolicyInfo[] {
    return this.dataAccess.editedPolicies || [];
  }

  @Computed()
  public get policyGroups(): PolicyGroup[] {
    const groupedByLabel = new Map<string, PolicyInfo[]>();

    this.policies.forEach(p => {
      const label = p.label || 'other';
      if (!groupedByLabel.has(label)) {
        groupedByLabel.set(label, []);
      }
      groupedByLabel.get(label)!.push(p);
    });

    const groups: PolicyGroup[] = [];

    groupedByLabel.forEach((policies, label) => {
      const permissionLabels = this.getGroupPermissionLabels(label, policies);
      const isMatrix = permissionLabels.length > 1;

      groups.push({
        label,
        title: GROUP_TITLES[label] || label,
        policies,
        permissionLabels,
        isMatrix,
      });
    });

    const order = new Map<string, number>([
      ['crud', 0],
      ['other', 1],
    ]);

    return groups.sort((a, b) => (order.get(a.label) ?? 999) - (order.get(b.label) ?? 999));
  }

  private getGroupPermissionLabels(groupLabel: string, policies: PolicyInfo[]): string[] {
    const labels = new Set<string>();
    policies.forEach(p => {
      p.permissions.forEach(perm => labels.add(perm.label));
    });

    if (groupLabel === 'crud') {
      return CRUD_ORDER.filter(l => labels.has(l));
    }

    if (groupLabel === 'other') {
      return OTHER_ORDER.filter(l => labels.has(l));
    }

    return Array.from(labels);
  }

  @Computed()
  public get disabled(): boolean {
    return this.props.disabled || false;
  }

  public getLabelDisplay(label: string): string {
    return PERMISSION_LABELS[label] || label;
  }

  public getPermissionByLabel(policy: PolicyInfo, label: string) {
    return policy.permissions.find(p => p.label === label);
  }

  public areAllGranted(policy: PolicyInfo): boolean {
    return policy.permissions.every(p => p.granted);
  }

  @Action()
  public handlePermissionChange = (policyKey: string, permKey: string, checked: boolean): void => {
    const updated = this.policies.map(p => {
      if (p.key !== policyKey) return p;
      return {
        ...p,
        permissions: p.permissions.map(perm =>
          perm.key === permKey ? { ...perm, granted: checked } : perm
        ),
      };
    });

    this.props.onChange?.(updated);
  };

  @Action()
  public handleAllToggle = (policyKey: string, checked: boolean): void => {
    const updated = this.policies.map(p => {
      if (p.key !== policyKey) return p;
      return {
        ...p,
        permissions: p.permissions.map(perm => ({ ...perm, granted: checked })),
      };
    });

    this.props.onChange?.(updated);
  };
}

export default RolePermissionsModel;
