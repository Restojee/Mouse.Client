import { Map, Tag } from "@/api/codegen/genMouseMapsApi";

export type MapCreateFormType = {
  name: Map["name"];
  image?: string;
  completedMapImage?: string;
  tags?: Tag["id"][];
};
