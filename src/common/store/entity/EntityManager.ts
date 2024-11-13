import EntityState from "@common/store/entity/EntityState";

class EntityManager<E extends { id: string }> {

  private _entities: Map<string, EntityState<E>>;
  protected _ids: string[];

  public create(entity: E) {
    this._entities.set(entity.id, new EntityState(entity))
  }

  public remove(id: string) {
    this._entities.delete(id)
  }

  public upsert(entityList: E[]) {
    entityList.forEach(this.set)
  }

  public update(id: string, updates: Partial<Record<string, any>>) {
    const entity = this._entities[id];
    const fieldKeys = entity.getFieldKeys();

    for (const [key, value] of Object.entries(updates)) {
      entity[fieldKeys[key]] = value;
    }
  }

  public set(entity: E) {
    this._entities.set(entity.id, new EntityState<E>(entity));
  }

  public getCollection(): Array<E> {
    return Array.from(this._entities.values()).map(value => value.getEntity());
  }

  public getById(entityId: string): E {
    return this._entities.get(entityId).getEntity();
  }
}

export default EntityManager;