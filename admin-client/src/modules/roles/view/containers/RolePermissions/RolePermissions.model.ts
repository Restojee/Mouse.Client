import { inject } from 'inversify';
import { Action, Computed } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { RoleDataAccess } from '@/modules/roles/model/services/RoleDataAccess';
import { RoleDataAccessInjectKey } from '@/modules/roles/model/common/constants';
import type { PolicyInfo } from '@/modules/roles/model/entities/types';
import type { RolePermissionsProps } from './RolePermissions';

export type ActionKey = 'create' | 'read' | 'update' | 'delete';

const ACTIONS: { key: ActionKey; label: string }[] = [
  { key: 'create', label: 'Создание' },
  { key: 'read', label: 'Чтение' },
  { key: 'update', label: 'Ред.' },
  { key: 'delete', label: 'Удаление' },
];

class RolePermissionsModel extends ViewModel<RolePermissionsProps> {
  constructor(
    @inject(RoleDataAccessInjectKey) private dataAccess: RoleDataAccess
  ) {
    super();
  }

  @Computed()
  public get actions() {
    return ACTIONS;
  }

  @Computed()
  public get policies(): PolicyInfo[] {
    return this.props.policies || [];
  }

  @Computed()
  public get crudPolicies(): PolicyInfo[] {
    return this.policies.filter(p => p.isCrud);
  }

  @Computed()
  public get togglePolicies(): PolicyInfo[] {
    return this.policies.filter(p => !p.isCrud);
  }

  @Computed()
  public get disabled(): boolean {
    return this.props.disabled || false;
  }

  @Action()
  public handleActionChange = (policyKey: string, action: ActionKey, checked: boolean): void => {
    const updated = this.policies.map(p => {
      if (p.key !== policyKey) return p;
      const next = { ...p, [action]: checked };
      next.all = next.create && next.read && next.update && next.delete;
      return next;
    });

    this.props.onChange?.(updated);
  };

  @Action()
  public handleAllToggle = (policyKey: string, checked: boolean): void => {
    const updated = this.policies.map(p => {
      if (p.key !== policyKey) return p;
      return {
        ...p,
        create: checked,
        read: checked,
        update: checked,
        delete: checked,
        all: checked,
      };
    });

    this.props.onChange?.(updated);
  };

  @Action()
  public handleTogglePolicy = (policyKey: string, checked: boolean): void => {
    const updated = this.policies.map(p => {
      if (p.key !== policyKey) return p;
      return { ...p, all: checked };
    });

    this.props.onChange?.(updated);
  };
}

export default RolePermissionsModel;
