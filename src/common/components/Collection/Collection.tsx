import * as React from "react";

interface CollectionProps<ItemType> {
  itemKey: keyof ItemType;
  items: ItemType[];
  Component: React.FC<ItemType>;
}

const Collection = <ItemType extends {}>({
 items,
 Component,
 itemKey
}: CollectionProps<ItemType>) => {
  const ItemComponent = Component;
  return React.useMemo(() => items?.map((item) => (
    <ItemComponent key={item[itemKey] as React.Key} {...item} />
  )), [items, itemKey, Component])
};

export default Collection;
