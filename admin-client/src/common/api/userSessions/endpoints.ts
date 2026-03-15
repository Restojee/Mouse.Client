export enum UserSessionEndpoints {
  Collect = 'Collect',
}

export const UserSessionUrls: Record<UserSessionEndpoints, string> = {
  [UserSessionEndpoints.Collect]: 'user-sessions/collect',
};
