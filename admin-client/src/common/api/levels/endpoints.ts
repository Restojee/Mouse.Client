export enum LevelEndpoints {
  Collect = 'Collect',
  ById = 'ById',
  Remove = 'Remove',
  Create = 'Create',
  Update = 'Update',
  UpdateImage = 'UpdateImage',
  FavoriteDelete = 'FavoriteDelete',
  CompletedCreate = 'CompletedCreate',
  CompletedDelete = 'CompletedDelete',
  TagCollect = 'TagCollect',
  TagCreate = 'TagCreate',
  TagDelete = 'TagDelete',
}

export const LevelUrls: Record<LevelEndpoints, string> = {
  [LevelEndpoints.Collect]: 'levels/collect',
  [LevelEndpoints.ById]: `levels/by-id`,
  [LevelEndpoints.Remove]: 'levels/remove',
  [LevelEndpoints.Create]: 'levels/create',
  [LevelEndpoints.Update]: 'levels/update',
  [LevelEndpoints.UpdateImage]: 'levels',
  [LevelEndpoints.FavoriteDelete]: 'levels/favorite/delete',
  [LevelEndpoints.CompletedCreate]: 'levels/completed/create',
  [LevelEndpoints.CompletedDelete]: 'levels/completed/delete',
  [LevelEndpoints.TagCollect]: 'levels/tags/collect',
  [LevelEndpoints.TagCreate]: 'levels/tags/create',
  [LevelEndpoints.TagDelete]: 'levels/tags/remove',
};
