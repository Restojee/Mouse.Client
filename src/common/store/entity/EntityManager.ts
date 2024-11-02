import Entity from '@common/store/entity/Entity';

class EntityManager<E extends Entity> {

  private _entities: Map<string, E>

  public create(entity: E) {
    this._entities.set(entity.getId(), entity)
  }

  public remove(id: string) {
    this._entities.delete(id)
  }

  public collect(): Array<E> {
    return Array.from(this._entities.values());
  }

  public entities() : Map<string, E> {
    return this._entities;
  }

  public get(entityId: string): E {
    return this._entities.get(entityId);
  }

  public upsert(entityList: E[]) {
    entityList.forEach(this.set)
  }

  public set(entity: E) {
    this._entities.set(entity.getId(), entity);
  }

  public clear() {
    this._entities.clear();
  }
}

export default EntityManager;