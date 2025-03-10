import LevelDataAccess from "@/modules/levels/model/services/LevelDataAccess";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { FormGroup } from "@common/store/form/FormGroup";
import { inject, injectable } from "inversify";

@injectable()
class LevelSelectors {
  constructor(
    @inject(LevelDataAccess)
    private readonly levelDataAccess: LevelDataAccess
  ) {}

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