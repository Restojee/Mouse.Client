export interface Level { id: string; name: string; description?: string; }

export interface LevelByIdArgsType { id: string; }
export interface LevelByIdResponseType extends Level {}

export interface LevelRemoveArgsType { id: string; }
export interface LevelRemoveResponseType {}

export interface LevelCreateArgsType { id: string; name: string; description?: string; }
export interface LevelCreateResponseType extends Level {}

export interface LevelUpdateArgsType { id: string; name?: string; description?: string; }
export interface LevelUpdateResponseType extends Level {}

export interface LevelCollectArgsType { page: number; size: number; }
export interface LevelCollectResponseType { total: number; records: Array<Level> }
