import withModule from "@common/hocs/withModule";
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import { LevelModule, LevelModuleInjectKey } from "@/modules/levels/model/services/LevelModule";
import LevelsContainer from "@/modules/levels/view/containers/LevelsContainer";

export default withModule<LevelModuleProps>({
  container: LevelsContainer,
  moduleKey: LevelModuleInjectKey,
  module: LevelModule,
});