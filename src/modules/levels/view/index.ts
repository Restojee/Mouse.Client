import withModule from "@common/hocs/withModule";
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import { LevelModule } from "@/modules/levels/model/services/LevelModule";
import LevelsContainer from "@/modules/levels/view/containers/LevelsContainer";

export default withModule<LevelModuleProps>(LevelsContainer, new LevelModule());