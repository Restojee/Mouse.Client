import withModule from "@common/hocs/withModule";
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import LevelsContainer from "@/modules/levels/view/containers/LevelsContainer";
import LevelActions, { LevelActionsInjectKey } from "@/modules/levels/model/services/LevelActions";
import LevelDataAccess, { LevelDataAccessInjectKey } from "@/modules/levels/model/services/LevelDataAccess";
import LevelsApi, { LevelApiInjectKey } from "@common/api/levels/api";
import LevelCreateForm, { LevelCreateFormInjectKey } from "@/modules/levels/model/services/LevelCreateForm";
import LevelSelectors, { LevelSelectorsInjectKey } from "@/modules/levels/model/services/LevelSelectors";

export default withModule<LevelModuleProps>({
  key: 'LevelModule',
  container: LevelsContainer,
  services: {
    [LevelActionsInjectKey]: LevelActions,
    [LevelDataAccessInjectKey]: LevelDataAccess,
    [LevelCreateFormInjectKey]: LevelCreateForm,
    [LevelApiInjectKey]: LevelsApi,
    [LevelSelectorsInjectKey]: LevelSelectors,
  },
});