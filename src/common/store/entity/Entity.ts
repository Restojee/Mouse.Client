class Entity {

  public fieldKeys: Record<string, string> = {};

  public getFieldKeys(): Record<string, string> {
    return this.fieldKeys;
  }
}

export default Entity;