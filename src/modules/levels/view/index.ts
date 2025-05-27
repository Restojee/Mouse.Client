import withModule from "@common/hocs/withModule";
import LevelsContainer from "@/modules/levels/view/containers/LevelsContainer";
import LevelActions from "@/modules/levels/model/services/LevelActions";
import LevelDataAccess from "@/modules/levels/model/services/LevelDataAccess";
import LevelsApi from "@common/api/levels/api";
import LevelCreateForm from "@/modules/levels/model/services/LevelCreateForm";
import LevelSelectors from "@/modules/levels/model/services/LevelSelectors";
import {
  LevelActionsInjectKey,
  LevelCreateFormInjectKey,
  LevelDataAccessInjectKey,
  LevelsApiInjectKey, LevelSelectorsInjectKey,
} from "@/modules/levels/model/common/constants";

export default withModule({
  key: 'LevelModule',
  component: LevelsContainer,
  providers: [
    {
      key: LevelDataAccessInjectKey,
      provide: LevelDataAccess
    },
    {
      key: LevelCreateFormInjectKey,
      provide: LevelCreateForm
    },
    {
      key: LevelsApiInjectKey,
      provide: LevelsApi
    },
    {
      key: LevelSelectorsInjectKey,
      provide: LevelSelectors
    },
    {
      key: LevelActionsInjectKey,
      provide: LevelActions
    },
  ]
});
