import EntityManager from "@common/store/entity/EntityManager";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { FormGroup } from "@common/store/form/FormGroup";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import LevelActions, { LevelActionsInjectKey } from "@/modules/levels/model/services/LevelActions";

export interface LevelState {
  levels: EntityManager<LevelEntity>
  createLevel: FormGroup<CreateLevelEntity>
  updateLevel: FormGroup<UpdateLevelEntity>
}

export interface LevelModuleProps {
  [LevelActionsInjectKey]: LevelActions
}