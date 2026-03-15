export enum TipEndpoints {
  Collect = 'Collect',
  Remove = 'Remove',
  Create = 'Create',
  Update = 'Update',
}

export const TipUrls: Record<TipEndpoints, string> = {
  [TipEndpoints.Collect]: 'tips/collect',
  [TipEndpoints.Remove]: 'tips/delete',
  [TipEndpoints.Create]: 'tips/create',
  [TipEndpoints.Update]: 'tips/update',
};
