export interface RoleCollectArgs {
  page?: number;
  size?: number;
  name?: string;
}

export interface RoleCardResponse {
  id: number;
  name: string;
  description?: string;
  createdUtcDate?: string;
  usersCount?: number;
  permissionsCount?: number;
}

export type RoleCollectResponse = RoleCardResponse[];

export interface RolePolicyInfoResponse {
  key: string;
  name: string;
  isCrud: boolean;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  all: boolean;
}

export interface RoleDetailsResponse {
  id: number;
  name: string;
  description?: string;
  usersCount: number;
  createdUtcDate?: string;
  policies: RolePolicyInfoResponse[];
}

export interface RoleGetArgs {
  roleId: number;
}

export type RoleGetResponse = RoleDetailsResponse;

export interface RoleCreateArgs {
  name: string;
  description?: string;
}

export interface RoleCreateResponse extends RoleCardResponse {}

export interface RoleUpdateArgs {
  id: number;
  name: string;
  description?: string;
}

export interface RoleUpdateResponse extends RoleCardResponse {}

export interface RoleDeleteArgs {
  roleId: number;
}

export type RoleDeleteResponse = string;

export interface RoleSetPermissionsArgs {
  roleId: number;
  policies: RolePolicyInfoResponse[];
}

export type RoleSetPermissionsResponse = string;

export interface AssignRoleToUserArgs {
  userId: number;
  roleName: string;
}

export type AssignRoleToUserResponse = string;
