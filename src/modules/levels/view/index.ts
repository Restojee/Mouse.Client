import withModule from "@common/hocs/withModule";
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import LevelsContainer from "@/modules/levels/view/containers/LevelsContainer";
import LevelService, { LevelServiceInjectKey } from "@/modules/levels/model/services/LevelService";
import LevelDataAccess, { LevelDataAccessInjectKey } from "@/modules/levels/model/services/LevelDataAccess";
import LevelsApi, { LevelApiInjectKey } from "@common/api/levels/api";

export default withModule<LevelModuleProps>({
  key: 'LevelModule',
  container: LevelsContainer,
  services: {
    [LevelServiceInjectKey]: LevelService,
    [LevelDataAccessInjectKey]: LevelDataAccess,
    [LevelApiInjectKey]: LevelsApi,
  },
});