export interface Tag { id: string; name: string; description?: string; }

export interface TagRemoveArgs { id: string; }
export interface TagRemoveResponse {}

export interface TagCreateArgs { name: string; description?: string; }
export interface TagCreateResponse extends Tag {}

export interface TagUpdateArgs { id: string; name?: string; description?: string; }
export interface TagUpdateResponse extends Tag {}

export interface TagCollectArgs { }
export type TagCollectResponse = Array<Tag>
