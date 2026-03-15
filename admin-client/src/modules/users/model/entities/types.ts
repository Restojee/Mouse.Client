export interface UserFormData {
  username: string;
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  avatar?: string;
  username: string;
  email?: string;
  role?: string;
  createdUtcDate?: string;
  modifiedUtcDate?: string;
}
