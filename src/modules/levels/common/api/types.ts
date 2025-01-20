export interface Level { id: string; name: string; description?: string; }

export interface LevelByIdArgs { id: string; }
export interface LevelByIdResponse extends Level {}

export interface LevelRemoveArgs { id: string; }
export interface LevelRemoveResponse {}

export interface LevelCreateArgs { name: string; description?: string; }
export interface LevelCreateResponse extends Level {}

export interface LevelUpdateArgs { id: string; name?: string; description?: string; }
export interface LevelUpdateResponse extends Level {}

export interface LevelCollectArgs { page: number; size: number; ids?: number[] }
export interface LevelCollectResponse { total: number; records: Array<Level> }
