export class Instance {
  private instances: Map<symbol, any> = new Map();

  public add<T extends object>(key: symbol, object: T) {
    this.instances.set(key, object)
    return this.get<T>(key);
  }

  public get<T extends object>(key: symbol): T {
    return this.instances.get(key)
  }

  public remove(key: symbol) {
    this.instances.delete(key);
  }
}