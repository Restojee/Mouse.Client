import Entity from '@common/store/entity/Entity';
import { EntityState } from "@/modules/levels/model/store/types";

class EntityManager<E extends Entity> {

  private _entities: Map<string, E>;
  protected _ids: string[];

  public create(entity: E) {
    this._entities.set(entity.id, entity)
  }

  public remove(id: string) {
    this._entities.delete(id)
  }

  public upsert(entityList: E[]) {
    entityList.forEach(this.set)
  }

  public update(id: string, updates: Partial<Record<string, any>>) {
    const entity = this.getById(id);
    const fieldKeys = entity.getFieldKeys();

    for (const [key, value] of Object.entries(updates)) {
      entity[fieldKeys[key]] = value;
    }
  }

  public set(entity: E) {
    this._entities.set(entity.id, entity);
  }

  public getCollection(): Array<E> {
    return Array.from(this._entities.values());
  }

  public getEntities() : Map<string, E> {
    return this._entities;
  }

  public getById(entityId: string): E {
    return this._entities.get(entityId);
  }

  public getInitialState(): EntityState<E> {
    return {
      entities: this._entities,
      ids: this._ids
    }
  }
}

export default EntityManager;