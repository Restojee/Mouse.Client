import * as React from 'react';
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import Levels from "@/modules/levels/view/containers/Levels";

const LevelsContainer: React.FC<LevelModuleProps> = ({ levelService }) => {
  return <Levels levelService={levelService} />
}
export default React.memo(LevelsContainer);