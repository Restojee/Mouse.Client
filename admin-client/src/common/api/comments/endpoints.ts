export enum CommentEndpoints {
  Collect = 'Collect',
  CollectPaged = 'CollectPaged',
  Create = 'Create',
  CreateAdmin = 'CreateAdmin',
  Update = 'Update',
  UpdateAdmin = 'UpdateAdmin',
  Delete = 'Delete',
  DeleteBulk = 'DeleteBulk',
}

export const CommentUrls: Record<CommentEndpoints, string> = {
  [CommentEndpoints.Collect]: 'comments/collect',
  [CommentEndpoints.CollectPaged]: 'comments/collect-paged',
  [CommentEndpoints.Create]: 'comments/create',
  [CommentEndpoints.CreateAdmin]: 'comments/create-admin',
  [CommentEndpoints.Update]: 'comments/update',
  [CommentEndpoints.UpdateAdmin]: 'comments/update-admin',
  [CommentEndpoints.Delete]: 'comments/remove',
  [CommentEndpoints.DeleteBulk]: 'comments/delete-bulk',
};
