export enum TagEndpoints {
  Collect = 'Collect',
  Remove = 'Remove',
  Create = 'Create',
  Update = 'Update',
}

export const TagUrls: Record<TagEndpoints, string> = {
  [TagEndpoints.Collect]: 'tags/collect',
  [TagEndpoints.Remove]: 'tags/remove',
  [TagEndpoints.Create]: 'tags/create',
  [TagEndpoints.Update]: 'tags/update',
};
