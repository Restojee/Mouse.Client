import * as React from "react";
import { CollectionProps } from "@ui/Collection/types";

const Collection = <ItemType extends {}>({
 items,
 Component,
 itemKey
}: CollectionProps<ItemType>) => {
  const ItemComponent = Component;
  return React.useMemo(() => items.map((item) => (
    <ItemComponent key={item[itemKey as keyof ItemType] as React.Key} {...item} />
  )), [items, itemKey, Component])
};

export default Collection;
