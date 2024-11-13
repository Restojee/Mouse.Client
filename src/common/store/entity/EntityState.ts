class EntityState<E extends {}> {

  private _entity: E;

  constructor(entity: E) {
    this._entity = entity;
  }

  getEntity() {
    return this._entity;
  }

  public fieldKeys: Record<string, string> = {};

  public getFieldKeys(): Record<string, string> {
    return this.fieldKeys;
  }
}

export default EntityState;