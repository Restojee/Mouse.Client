import * as React from 'react';
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import Levels from "@/modules/levels/view/containers/Levels";
import { PropsWithChildren } from "react";

const LevelsContainer: React.FC<PropsWithChildren> = () => {
  return <Levels />
}
export default React.memo(LevelsContainer);