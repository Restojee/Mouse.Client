export interface User {
  id: number;
  avatar?: string;
  username: string;
  email?: string;
  role?: string;
  createdUtcDate?: string;
  modifiedUtcDate?: string;
}

export interface MeResponse extends User{}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
}
export interface CreateUserResponse extends User {}

export interface UpdateUserRequest {
  id: number;
  username: string;
  email?: string;
  avatar?: string;
  role?: string;
}
export interface UpdateUserResponse extends User {}

export interface UpdateUserAvatarRequest {
  id: number;
}
export interface UpdateUserAvatarResponse extends User {}

export interface DeleteUserResponse {}
export interface CollectUsersRequest {
  size: number;
  page: number;
}
export interface CollectUsersResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  records: User[];
}
