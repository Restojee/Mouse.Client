import * as React from "react";

export interface CollectionProps<ItemType = {}> {
  itemKey: keyof ItemType | string;
  items: ItemType[];
  Component: React.FC<ItemType>;
}
