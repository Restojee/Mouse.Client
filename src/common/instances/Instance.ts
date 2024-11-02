export class Instance {
  private instances: Map<string, any> = new Map();

  public add<T extends object>(key: string, object: T) {
    this.instances.set(key, object)
  }

  public get<T extends object>(key: string): T {
    return this.instances.get(key)
  }
}