export class Level { id: string; name: string; description?: string; }

export class LevelByIdRequest { id: string; }
export class LevelByIdResponse extends Level {}

export class LevelRemoveRequest { id: string; }
export class LevelRemoveResponse {}

export class LevelCreateRequest { name: string; description?: string; }
export class LevelCreateResponse extends Level {}

export class LevelUpdateRequest { id: string; name?: string; description?: string; }
export class LevelUpdateResponse extends Level {}

export class LevelCollectRequest { page: number; size: number; ids?: number[] }
export class LevelCollectResponse { total: number; records: Array<Level> }
