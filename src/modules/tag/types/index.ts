import { Tag } from "@/api/codegen/genMouseMapsApi";

export type TagModalTypes = "tag-delete" | "tag-create" | "tag-update" | "map-tags-update" | null;

export type TagsStateType = {
  modalType: TagModalTypes;
  tagsList: Tag[];
};
