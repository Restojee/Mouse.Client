export enum NotesEndpoints {
  Collect = 'collect',
  Create = 'create',
  Update = 'update',
  Remove = 'remove',
}

export const NotesUrls: Record<NotesEndpoints, string> = {
  [NotesEndpoints.Collect]: 'levels/notes/collect',
  [NotesEndpoints.Create]: 'levels/notes/create',
  [NotesEndpoints.Update]: 'levels/notes/update',
  [NotesEndpoints.Remove]: 'levels/notes/remove',
};
