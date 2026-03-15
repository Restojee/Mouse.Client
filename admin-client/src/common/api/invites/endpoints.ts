export enum InviteEndpoints {
  Collect = 'Collect',
  Create = 'Create',
  Revoke = 'Revoke'
}

export const InviteUrls: Record<InviteEndpoints, string> = {
  [InviteEndpoints.Collect]: 'api/invites/collect',
  [InviteEndpoints.Create]: 'api/invites/create',
  [InviteEndpoints.Revoke]: 'api/invites/revoke',
};
