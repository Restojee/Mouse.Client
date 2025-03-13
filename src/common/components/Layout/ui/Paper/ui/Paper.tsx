import React, { PropsWithChildren } from "react";
import cn from "clsx";
import { paperFlexClasses, paperRadiusClassBySizeMap } from "@ui/Layout/ui/Paper/common/constants";
import { Flex } from "@ui/Layout";
import { PaperProps } from "@ui/Layout/ui/Paper/common/types";

import "./Paper.scss"

const Paper: React.FC<PropsWithChildren<PaperProps>> = (props) => {
  const { bgColor, radius, className } = props;
  const radiusClassBySize = paperRadiusClassBySizeMap[radius];
  const flexClasses = cn(bgColor, radiusClassBySize, className, paperFlexClasses.root);

  return (
    <Flex {...props} className={flexClasses}>
      { props.children }
    </Flex>
  );
};

export default React.memo(Paper);
