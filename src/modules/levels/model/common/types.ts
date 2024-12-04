import EntityManager from "@common/store/entity/EntityManager";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { FormSchema } from "@common/store/form/FormSchema";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";

export interface LevelState {
  levels: EntityManager<LevelEntity>
  createLevel: FormSchema<CreateLevelEntity>
  updateLevel: FormSchema<UpdateLevelEntity>
}