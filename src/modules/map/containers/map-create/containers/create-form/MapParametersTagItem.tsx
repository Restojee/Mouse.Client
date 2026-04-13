import React, { memo } from "react";
import clsx from "clsx";
import tagStyles from "@/ui/Tag/Tag.module.scss";

type MapParametersTagItemPropsType = {
  name: string;
};

export const MapParametersTagItem = memo(({ name }: MapParametersTagItemPropsType) => {
  const className = clsx(tagStyles.tag, tagStyles.small);
  return <div className={className}>{name}</div>;
});

MapParametersTagItem.displayName = "MapParametersTagItem";
