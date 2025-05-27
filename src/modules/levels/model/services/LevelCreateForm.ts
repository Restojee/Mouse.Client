import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { FormGroup } from "@common/store/form/FormGroup";
import LevelSelectors from "@/modules/levels/model/services/LevelSelectors";
import { injectable } from "inversify";

@injectable()
class LevelCreateForm {

  constructor(
    private readonly levelSelectors: LevelSelectors
  ) {}

  public getForm(): FormGroup<CreateLevelEntity> {
    return this.levelSelectors.getLevelCreateForm();
  }
}

export default LevelCreateForm;
