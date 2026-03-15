export enum LevelTagEndpoints {
  Collect = 'Collect',
  GetById = 'GetById',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  Remove = 'Remove',
}

export const LevelTagUrls: Record<LevelTagEndpoints, string> = {
  [LevelTagEndpoints.Collect]: 'level-tags/collect',
  [LevelTagEndpoints.GetById]: 'level-tags/by-id',
  [LevelTagEndpoints.Create]: 'level-tags/create',
  [LevelTagEndpoints.Update]: 'level-tags/update',
  [LevelTagEndpoints.Delete]: 'level-tags/delete',
  [LevelTagEndpoints.Remove]: 'level-tags/remove',
};
