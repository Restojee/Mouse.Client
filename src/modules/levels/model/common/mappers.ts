import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { Level } from "@/modules/levels/common/api/types";

export const levelMappers = {
  toAppLevels(levels: Level[]): LevelEntity[] {
    return levels.map(level => {
      const levelEntity = new LevelEntity();
      levelEntity.name = level.name;
      levelEntity.description = level.description;
      levelEntity.id = level.id;
      return levelEntity;
    })
  },
  toApiLevels(levelEntities: LevelEntity[]): Level[] {
    return levelEntities.map(levelEntity => ({
      description: levelEntity.description,
      name: levelEntity.name,
      id: levelEntity.id
    }))
  }
}