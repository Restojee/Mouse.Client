import EntityState from "@common/store/entity/EntityState";
import { makeAutoObservable, observable, ObservableMap } from "mobx";

class EntityManager<E extends { id: string }> {

  public readonly entities: ObservableMap<string, EntityState<E>> = observable.map();
  public ids: string[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  public get getCollection(): Array<E> {
    return Array.from(this.entities.values()).map((value: EntityState<E>) => value.getEntity);
  }

  public create(entity: E): void {
    this.entities.set(entity.id, new EntityState(entity));
    this.updateIds();
  }

  public remove(id: string): void {
    this.entities.delete(id);
    this.updateIds();
  }

  public upsert(entityList: E[]): void {
    entityList.forEach(entity => this.set(entity));
  }

  public update(id: string, updates: Partial<E>): void {
    const entity = this.entities.get(id);
    if (!entity) return;
    Object.assign(entity, updates);
  }

  public set(entity: E): void {
    this.entities.set(entity.id, new EntityState<E>(entity));
    this.updateIds();
  }

  public updateIds(): void {
    this.ids = Array.from(this.entities.keys());
  }
}

export default EntityManager;
