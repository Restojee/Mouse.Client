export enum UserEndpoints {
  Me = 'Me',
  ByOne = 'ByOne',
  Collect = 'Collect',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  UpdateAvatar = 'UpdateAvatar',
}

export const UserUrls: Record<UserEndpoints, string> = {
  [UserEndpoints.Me]: 'users/me',
  [UserEndpoints.Collect]: 'users/collect',
  [UserEndpoints.ByOne]: 'users/me',
  [UserEndpoints.Create]: 'users/create',
  [UserEndpoints.Update]: 'users/update',
  [UserEndpoints.Delete]: 'users',
  [UserEndpoints.UpdateAvatar]: 'users/update/avatar',
};
