import * as React from 'react';
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import Levels from "@/modules/levels/view/containers/Levels";

const LevelsContainer: React.FC<LevelModuleProps> = (props) => {
  console.log('LevelsContainer', props)
  return <Levels />
}
export default React.memo(LevelsContainer);