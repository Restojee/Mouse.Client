export enum UserAuditLogEndpoints {
  Collect = 'Collect',
}

export const UserAuditLogUrls: Record<UserAuditLogEndpoints, string> = {
  [UserAuditLogEndpoints.Collect]: 'user-audit-logs/collect',
};
