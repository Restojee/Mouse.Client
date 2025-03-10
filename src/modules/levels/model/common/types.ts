import EntityManager from "@common/store/entity/EntityManager";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { FormGroup } from "@common/store/form/FormGroup";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import LevelActions from "@/modules/levels/model/services/LevelActions";
import LevelCreateForm from "@/modules/levels/model/services/LevelCreateForm";
import LevelDataAccess from "@/modules/levels/model/services/LevelDataAccess";
import LevelsApi from "@common/api/levels";
import LevelSelectors from "@/modules/levels/model/services/LevelSelectors";

export interface LevelState {
  levels: EntityManager<LevelEntity>
  createLevel: FormGroup<CreateLevelEntity>
  updateLevel: FormGroup<UpdateLevelEntity>
}

export interface LevelModuleProps {
  levelActions: LevelActions,
  levelDataAccess: LevelDataAccess,
  levelCreateForm: LevelCreateForm,
  levelApi: LevelsApi,
  levelSelectors: LevelSelectors,
}