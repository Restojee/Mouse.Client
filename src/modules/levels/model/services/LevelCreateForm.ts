import { Inject } from "@common/utils/di/Inject";
import Validated from "@common/store/Validate";
import { Register } from "@common/utils/di/Register";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { FormGroup } from "@common/store/form/FormGroup";
import LevelActions, { LevelActionsInjectKey } from "@/modules/levels/model/services/LevelActions";
import LevelSelectors, { LevelSelectorsInjectKey } from "@/modules/levels/model/services/LevelSelectors";

export const LevelCreateFormInjectKey = 'LevelCreateService';

function handleValidate(value: string) {
  const validated = new Validated(value);
  validated.setIsValid(false);
  validated.setError('Все ошибаются')
  return validated;
}
function handleClick() {}
function handleBlur() {}

@Register(LevelCreateFormInjectKey)
class LevelCreateForm {

  constructor(
    @Inject(LevelActionsInjectKey) private levelActions: LevelActions,
    @Inject(LevelSelectorsInjectKey) private levelSelectors: LevelSelectors
  ) {
    this.configureForm()
  }

  public configureForm(): void {
    this.getForm().configure(builder => {
      builder.getField('name').addEvent('onBlur', handleBlur);
      builder.getFields('name', 'description').addEvent('onClick', handleClick);
      builder.getField('name').addValidator(handleValidate);
    })
  }

  public getForm(): FormGroup<CreateLevelEntity> {
    return this.levelSelectors.getLevelCreateForm();
  }
}

export default LevelCreateForm;