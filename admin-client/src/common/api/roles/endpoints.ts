export enum RoleEndpoints {
  Collect = 'Collect',
  Get = 'Get',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  SetPermissions = 'SetPermissions',
  AssignToUser = 'AssignToUser',
}

export const RoleUrls: Record<RoleEndpoints, string> = {
  [RoleEndpoints.Collect]: 'roles/collect',
  [RoleEndpoints.Get]: 'roles',
  [RoleEndpoints.Create]: 'roles/create',
  [RoleEndpoints.Update]: 'roles/update',
  [RoleEndpoints.Delete]: 'roles',
  [RoleEndpoints.SetPermissions]: 'roles/permissions/set',
  [RoleEndpoints.AssignToUser]: 'roles/assign-to-user',
};
