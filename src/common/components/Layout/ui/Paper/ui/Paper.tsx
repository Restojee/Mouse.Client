import React, { PropsWithChildren } from "react";
import cn from "clsx";
import { paperFlexClasses, paperRadiusClassBySizeMap } from "@ui/Layout/ui/Paper/common/constants";
import { Flex } from "@ui/Layout";
import { PaperProps } from "@ui/Layout/ui/Paper/common/types";

import "./Paper.scss"

const Paper: React.FC<PropsWithChildren<PaperProps>> = (props) => {
  const { bgColor, radius, className, color, nonIntegration, ...flexProps } = props;
  const radiusClassBySize = paperRadiusClassBySizeMap[radius];
  const flexClasses = cn(
    bgColor, 
    radiusClassBySize, 
    className, 
    paperFlexClasses.root,
    nonIntegration && 'nonIntegration'
  );

  return (
    <Flex {...flexProps} className={flexClasses}>
      { props.children }
    </Flex>
  );
};

export default React.memo(Paper);
