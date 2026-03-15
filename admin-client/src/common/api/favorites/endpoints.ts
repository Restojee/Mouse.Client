export enum FavoriteEndpoints {
  Collect = 'Collect',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
}

export const FavoriteUrls: Record<FavoriteEndpoints, string> = {
  [FavoriteEndpoints.Collect]: 'levels/favorite/collect',
  [FavoriteEndpoints.Create]: 'levels/favorite/create',
  [FavoriteEndpoints.Delete]: 'levels/favorite/remove',
  [FavoriteEndpoints.Update]: 'levels/favorite/update',
};
