export enum CompletedEndpoints {
  Collect = 'Collect',
  ByLevelId = 'ByLevelId',
  Create = 'Create',
  Update = 'Update',
  UpdateImage = 'UpdateImage',
  Delete = 'Delete',
}

export const CompletedUrls: Record<CompletedEndpoints, string> = {
  [CompletedEndpoints.Collect]: 'levels/completed/collect',
  [CompletedEndpoints.ByLevelId]: 'levels/completed/by-level-id',
  [CompletedEndpoints.Create]: 'levels/completed/create',
  [CompletedEndpoints.Update]: 'levels/completed/update',
  [CompletedEndpoints.UpdateImage]: 'levels/update-completed-image',
  [CompletedEndpoints.Delete]: 'levels/completed/remove',
};
