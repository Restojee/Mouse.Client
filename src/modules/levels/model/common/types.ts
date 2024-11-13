import EntityManager from "@common/store/entity/EntityManager";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { FormSchema } from "@common/store/formSchema";

export interface LevelState {
  levels: EntityManager<LevelEntity>
  createLevelForm: FormSchema<CreateLevelEntity>
  updateLevelForm: FormSchema<UpdateLevelEntity>
}