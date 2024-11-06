import LevelEntity from "@/modules/levels/model/common/LevelEntity";

export interface LevelState {
  levels: EntityState<LevelEntity>
}

export interface EntityState<E> {
  entities: Map<string, E>,
  ids: string[] }