import EntityManager from "@common/store/entity/EntityManager";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { LevelRequest } from "@/modules/levels/model/entities/LevelRequest";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { FormSchema } from "@common/store/formSchema";

export interface LevelState {
  levels: EntityManager<LevelEntity>
  createLevel: FormSchema<LevelRequest>
  updateLevel: FormSchema<UpdateLevelEntity>
}