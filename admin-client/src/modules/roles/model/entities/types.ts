export interface PolicyInfo {
  key: string;
  name: string;
  isCrud: boolean;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  all: boolean;
}

export interface RoleFormData {
  name: string;
  description: string;
}

export interface RoleData {
  id: number;
  name: string;
  description?: string;
  policies?: PolicyInfo[];
  permissionsCount?: number;
  createdUtcDate?: string;
  usersCount?: number;
}

export interface UserRoleAssignment {
  userId: number;
  roleId: number;
}
