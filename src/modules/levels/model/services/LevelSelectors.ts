import { Inject } from "@common/utils/di/Inject";
import { LevelActionsInjectKey } from "@/modules/levels/model/services/LevelActions";
import { Register } from "@common/utils/di/Register";
import LevelDataAccess from "@/modules/levels/model/services/LevelDataAccess";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { FormGroup } from "@common/store/form/FormGroup";

export const LevelSelectorsInjectKey = 'LevelSelectors';

@Register(LevelSelectorsInjectKey)
class LevelSelectors {
  constructor(@Inject(LevelActionsInjectKey) private levelDataAccess: LevelDataAccess) {}

  public getLevelCreateForm(): FormGroup<CreateLevelEntity> {
    return this.levelDataAccess.getLevelCreateForm();
  }
  public getLevelUpdateForm(): FormGroup<UpdateLevelEntity> {
    return this.levelDataAccess.getLevelUpdateForm();
  }
  public getLevelCollection() {
    return this.levelDataAccess.getLevelCollection();
  }
}
export default LevelSelectors;