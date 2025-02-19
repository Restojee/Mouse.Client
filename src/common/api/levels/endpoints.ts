export enum LevelEndpoints {
  Collect = 'Collect',
  ById = 'ById',
  Remove = 'Remove',
  Create = 'Create',
  Update = 'Update',
}

export const LevelUrls: Record<LevelEndpoints, string> = {
  [LevelEndpoints.Collect]: 'maps/collect',
  [LevelEndpoints.ById]: `maps/by-id/{id}`,
  [LevelEndpoints.Remove]: 'maps/remove/{id}',
  [LevelEndpoints.Create]: 'maps/create',
  [LevelEndpoints.Update]: 'maps/update',
};
